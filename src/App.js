import React, { Component } from 'react'
import { Router, Route, Link } from 'react-router'
import Dashboard from './components/dashboard.js'

export default class App extends Component {
  render() {
    return <Dashboard />
  }
}