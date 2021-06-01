import React, { Component, createRef } from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

import { getUserInfo, changeUserProfileField, saveProfile } from '../actions/userActions';
import Paper from '@material-ui/core/Paper';
import '../styles/profile.css';
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { emptyValueErrorText } from '../constants/appConstants';


const avatarStyles = {
    marginBottom: 20,
    width: 250,
    height: 250,
};

class ProfileComponent extends Component {
    static propTypes = {
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        gender: PropTypes.number.isRequired,
        company: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired,
        firstNameError: PropTypes.string.isRequired,
        lastNameError: PropTypes.string.isRequired,
        emailError: PropTypes.string.isRequired,
        getUserInfo: PropTypes.func.isRequired,
        changeUserProfileField: PropTypes.func.isRequired,
        saveProfile: PropTypes.func.isRequired,
    };


    handleOnChange = (event) => {
        const newImage = event.target?.files?.[0];
        if (newImage) {
            this.props.changeUserProfileField('avatar', URL.createObjectURL(newImage));
        };
    };

    formField = (label, value, fieldName, error=false) => {
        return (
            <div className="profile-form-field-container">
                <FormControl className="short-form-field" variant="outlined">
                    <TextField
                        variant="outlined"
                        label={ label || '' }
                        value={ value }
                        error={ error }
                        helperText={ error ? emptyValueErrorText : '' }
                        onChange={ event => this.props.changeUserProfileField(fieldName, event.target.value) }
                    />
                </FormControl>
            </div>
        )
    };

    genderField = (gender) => {
        return (
            <FormControl>
                <div className="profile-gender-title">Пол</div>
                <div className="profile-genders-container">
                    <RadioGroup
                        aria-label="gender"
                        value={gender}
                        onChange={(event) => this.props.changeUserProfileField(
                            'gender', parseInt(event.target.value)
                        )}
                    >
                        <div className="profile-main-side-by-side">
                            <FormControlLabel value={0} control={<Radio />} label="женcкий" />
                            <FormControlLabel value={1} control={<Radio />} label="мужской" />
                        </div>
                    </RadioGroup>
                </div>
            </FormControl>
        )
    };

    saveProfile = () => {
        const {
            avatar, firstName, lastName, position, company, gender, email
        } = this.props;
        if (!firstName) {
            this.props.changeUserProfileField('firstNameError', true);
            return;
        }
        if (!lastName) {
            this.props.changeUserProfileField('lastNameError', true);
            return;
        }
        if (!email) {
            this.props.changeUserProfileField('emailError', true);
            return;
        }
        this.props.saveProfile({
            first_name: firstName,
            last_name: lastName,
            email,
            position,
            gender,
            company,
            avatar,
        });
    };

    render() {
        const { avatar, firstName, lastName, position, company, gender, email, firstNameError, lastNameError, emailError } = this.props;
        const inputFileRef = createRef(null);
        return (
            <div className="paper-container">
                <Paper elevation={3}>
                    <div className="profile-page-container">
                        <div className="profile-title">Мой профиль</div>
                        <div className="profile-content-container">
                            <div className="profile-avatar-container">
                                <Avatar
                                    src={ avatar }
                                    style={ avatarStyles }
                                />
                                <input
                                    ref={inputFileRef}
                                    accept="image/*"
                                    hidden
                                    id="avatar-image-upload"
                                    type="file"
                                    onChange={ this.handleOnChange }
                                  />
                                <label htmlFor="avatar-image-upload">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                    startIcon={<SearchIcon />}
                                >
                                  загрузить
                                </Button>
                              </label>
                            </div>
                            <div className="profile-main-form-container">
                                <div className="profile-main-side-by-side">
                                    { this.formField('Имя', firstName, 'firstName', firstNameError) }
                                    { this.formField('Фамилия', lastName, 'lastName', lastNameError) }
                                </div>
                                <div className="profile-main-side-by-side">
                                    { this.formField('Компания', company, 'company') }
                                    { this.formField('Должность', position, 'position') }
                                </div>
                                <div className="profile-main-side-by-side">
                                    { this.formField('Email', email, 'email', emailError) }
                                    { this.genderField(gender)}
                                </div>
                            </div>
                            <div className="profile-saving-container">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => this.saveProfile()}
                                >Сохранить</Button>
                            </div>
                        </div>
                    </div>
                </Paper>
            </div>
        ) }
};


const mapStateToProps = ({ userReducer }) => ({
    firstName: userReducer.firstName,
    lastName: userReducer.lastName,
    email: userReducer.email,
    avatar: userReducer.avatar,
    gender: userReducer.gender,
    company: userReducer.company,
    position: userReducer.position,
    firstNameError: userReducer.firstNameError,
    lastNameError: userReducer.lastNameError,
    emailError: userReducer.emailError,
});

const mapDispatchToProps = {
    getUserInfo,
    saveProfile,
    changeUserProfileField,
};

const Profile = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileComponent);

export default Profile;
