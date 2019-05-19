import React from 'react';
import './PracticeProgramm.css';

export default class PracticeProgramm extends React.Component {
    state = {
        g: 10
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    render() {
        const inputValues = [
            {
                label: "G:",
                name: "g",
                type: "number",
                value: this.state.g
            }
        ]
        return (
            <div className="Main">
                <div className="Back-button" onClick={() => this.props.navigateTo()}>
                    Back
                </div>
                <form>
                    {inputValues.map((inputInfo, index) => {
                        return (
                            <label key={index}>
                                {inputInfo.label}
                                <input type={inputInfo.type} name={inputInfo.name} value={inputInfo.value} onChange={this.handleChange} />
                            </label>
                        )
                    })}
                </form>
            </div>
        );
    }
}

