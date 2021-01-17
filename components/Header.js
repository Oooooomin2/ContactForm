import React, { Component } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

class Header extends Component {
    render() {
        return (
            <header>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            お問合せフォーム
                        </Typography>
                    </Toolbar>
                </AppBar>
            </header>

        );
    }
}
export default Header;