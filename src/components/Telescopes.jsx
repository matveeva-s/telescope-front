import React, { Component } from 'react';
import {connect} from "react-redux";

import '../styles/loginPage.css';
import { getTelescopesList } from "../actions/telescopesActions";
import PropTypes from "prop-types";

import { Telescope } from './Telescope';

class TelescopesComponent extends Component {
    static propTypes = {
        getTelescopesList: PropTypes.func.isRequired,
        telescopes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
        lastName: PropTypes.bool.isRequired,
    };

    componentDidMount() {
        this.props.getTelescopesList();
    }

    render() {
        const { telescopes } = this.props;
        return (
            telescopes.length ?
                telescopes.map(el => <Telescope telescope={ el }/>)
                : 'Здесь пока ничего нет...'
        )
    }
}


const mapStateToProps = ({ telescopeReducer }) => ({
    telescopes: telescopeReducer.telescopes,
    isLoading: telescopeReducer.isLoading,
});

const mapDispatchToProps = {
    getTelescopesList,
};

export const Telescopes = connect(
  mapStateToProps,
  mapDispatchToProps
)(TelescopesComponent);
