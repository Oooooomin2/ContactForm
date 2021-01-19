import json
import boto3
import urllib.parse
import time
import decimal
import base64

dynamodb = boto3.resource('dynamodb')

MAILFROM=''
def sendmail(to, subject, body):
    client = boto3.client('ses')
    
    response = client.send_email(
        Source=MAILFROM,
        ReplyToAddresses=[MAILFROM],
        Destination={
            'ToAddresses': [ to ]
        },
        Message={
            'Subject': {
                'Data': subject,
                'Charset': 'UTF-8'
            },
            'Body' :{
                'Text': {
                    'Data': body,
                    'Charset': 'UTF-8'
                }
            }
        }
    )
    
def next_seq(table, tablename):
    response = table.update_item(
        Key={
            'tablename': tablename
        },
        UpdateExpression="set seq = seq + :val",
        ExpressionAttributeValues={
            ':val' : 1
        },
        ReturnValues='UPDATED_NEW'
    )
    return response['Attributes']['seq']

def lambda_handler(event, context):
    try:
        seqtable=dynamodb.Table('sequence')
        nextseq = next_seq(seqtable, 'contact')
        
        body = base64.b64decode(event['body'])
        param = urllib.parse.parse_qs(body.decode('utf-8'))
        username=param['username'][0]
        mailaddress=param['mailaddress'][0]
        phonenumber=param['phonenumber'][0]
        contact=param['contact'][0]
        
        host=event['requestContext']['http']['sourceIp']
        
        now=time.time()
        
        contacttable = dynamodb.Table("ContactInfo")
        contacttable.put_item(
        Item={
            'id': nextseq,
            'username': username,
            'mailaddress': mailaddress,
            'phonenumber' :phonenumber,
            'contact': contact,
            'accepted': decimal.Decimal(str(now)),
            'host': host
            }
        )
        
        mailbody = """
        
        {0}さん({1})からお問合せメッセージが届いたよ！
        
        {2}
        """.format(username, mailaddress, contact)
        
        sendmail(MAILFROM, 'お問合せ', mailbody)
    
        return {
            'statusCode': 200,
            'headers' : {
                'content-type': 'text/html'
            },
            'body':'<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>お問合せありがとうございました。</body></html>'
        }
    
    except:
        import traceback
        traceback.print_exc()
        return {
            'statusCode': 500,
            'headers': {
                'content-type': 'text/html'
            },
            'body': '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>内部エラーが発生しました。</body></html>'
        }