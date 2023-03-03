import React, { Component } from "react";
import { BsThreeDotsVertical, BsXLg } from "react-icons/bs";
import './Styles/Note.scss';

export default class Note extends Component {
    constructor(props) {
        super(props);
        this.state = { menuHidden: false };
    }
    render() {
        return (
            <>
                <div className={`note ${this.props.color}`}>
                    <header>
                        <h6>{this.props.title}</h6>
                        <div className="options-note">
                            <button
                                className="btn-show-menu"
                                onClick={() => { this.setState({ menuHidden: !this.state.menuHidden }) }}
                                onBlur={() => {
                                    setTimeout(() => {
                                        this.setState({ menuHidden: !this.state.menuHidden })
                                    }, 800)
                                }}>
                                <BsThreeDotsVertical />
                            </button>
                            <div
                                className="menu-options"
                                style={{ 'display': `${this.state.menuHidden ? 'flex' : 'none'}` }}>
                                <button onClick={this.props.edit}>edit</button>
                                <button onClick={this.props.delete}>delete</button>
                            </div>
                        </div>
                    </header>
                    <section>
                        <p>{this.props.note}</p>
                    </section>
                </div >
            </>
        );
    }
}