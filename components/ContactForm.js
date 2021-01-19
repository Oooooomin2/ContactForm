import React, { Component } from 'react';
import { TextField, Input } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

class ContactForm extends Component {
    render() {

        return (
            <Grid container alignItems="center" justify="center">
                <form id="ContactForm" method="POST" action="https://mq11noa40k.execute-api.ap-northeast-1.amazonaws.com/prod/lambda_handler">
                    <Grid className="gridItems" item md={12}>
                        <TextField
                            required
                            fullWidth
                            id="Username"
                            label="お名前"
                            name="username"
                            variant="outlined"
                            color="secondary"
                        />
                    </Grid>
                    <Grid className="gridItems" item md={12}>
                        <TextField
                            required
                            fullWidth
                            name="mailaddress"
                            id="MailAddress"
                            label="メールアドレス"
                            variant="outlined"
                            color="secondary"
                        />
                    </Grid>
                    <Grid className="gridItems" item md={12}>
                        <TextField
                            fullWidth
                            name="phonenumber"
                            id="PhoneNumber"
                            label="電話番号"
                            variant="outlined"
                            color="secondary"
                        />
                    </Grid>
                    <Grid className="gridItems" item md={12}>
                        <TextField
                            required
                            fullWidth
                            rows={15}
                            multiline
                            name="contact"
                            id="Contact"
                            label="お問合せ内容"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid id="SubmitButtonGrid" className="gridItems" item md={12}>
                        <Input
                            id="SubmitButton"
                            type="submit"
                            variant="outlined"
                        />
                    </Grid>
                </form>
            </Grid>
        );
    }
}
export default ContactForm; 