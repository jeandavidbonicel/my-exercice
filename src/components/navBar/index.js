import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { findUserBySuggestion } from '../../utils';
import Suggestions from '../suggestions';

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
})


const styles = theme => ({
    root: {
        width: '100%',
        position: 'fixed',
        zIndex: 3000,
        top: 0,
        left: 0,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
});

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersSuggested: {},
            search: ''
        }
    }

    findUser(suggestion) {
        const usersFound = findUserBySuggestion(this.props.userReducer.users, suggestion);

        this.setState({
            usersSuggested: usersFound
        });
    }

    handleChange = name => event => {

        this.setState({
            [name]: event.target.value,
        });

        if (event.target.value !== '') {
            this.findUser(event.target.value);
        } else {
            this.setState({
                usersSuggested: {},
            });
            this.props.action('none')
        }
        
    }

    onClickSuggestion(e) {
        this.props.action(e.target.children[1].innerHTML)
        this.setState({
            usersSuggested: {},
        });
    }



    render() {
        const { classes } = this.props;
        const { usersSuggested, search } = this.state;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            My Exercice
                        </Typography>
                        <div className={classes.search}>
                            <InputBase
                                value={search}
                                onChange={this.handleChange('search')}
                                placeholder="Search an user…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
                {
                    usersSuggested.length > 0 &&
                    <Suggestions users={usersSuggested} action={this.onClickSuggestion.bind(this)} />
                }
            </div>
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    action: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavBar));