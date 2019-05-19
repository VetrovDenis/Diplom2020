import React from 'react';
import './PracticeProgramm.css';
import Chart from "chart.js"
import MaterialIcon from 'material-icons-react';
import { calculateTwoPhaseSkin } from "../../services/sheet/two-phase-skin"

export default class PracticeProgramm extends React.Component {
    state = {
        g: 9.8,
        δ1: 1,
        δ2: 1,
        p1: 1,
        p2: 2,
        υ1: 1,
        υ2: 2,
        μ1: 1,
        μ2: 2,
        Ge: 0,
        maxSpeed: null,
        averageSpeed: null,
        geOpt: null,
        yLength: 10
    }
    componentDidMount = () => {
        this.calculateChart()
    }
    handleChange = (event) => {
        if (event.target.value.length > 0) {
            this.setState({ [event.target.name]: parseFloat(event.target.value) })
        }
    }
    clearInput = (event) => {
        //this.setState({ [event.target.name]: 0 })
    }
    calculateChart = () => {
        const { g, δ1, δ2, p1, p2, υ1, υ2, μ1, μ2, Ge, yLength } = this.state
        const calculateInfo = calculateTwoPhaseSkin(g, δ1, δ2, p1, p2, υ1, υ2, μ1, μ2, Ge, yLength)
        console.log(calculateInfo.speedArray)
        this.setState({
            maxSpeed: calculateInfo.Wmax,
            averageSpeed: calculateInfo.Wsr,
            geOpt: calculateInfo.GeOpt
        })
        let w1Array = [], w2Array = [], indexArray = []
        calculateInfo.speedArray.forEach(speedElement => {
            w1Array.push(speedElement.W1)
            w2Array.push(speedElement.W2)
            indexArray.push(speedElement.y.toFixed(1))
        });
        var myLineChart = new Chart(this.refs.myChart, {
            type: 'line',
            data: {
                labels: indexArray,
                datasets: [{
                    label: 'Профіль швидкості першої плівки',
                    data: w1Array,
                    borderColor: 'rgba(255, 99, 132, 0.8)',
                    fill: false,
                    borderWidth: 1
                },
                {

                    label: 'Профіль швидкості другої плівки',
                    data: w2Array,
                    borderColor: 'rgba(255, 206, 86, 0.8)',
                    fill: false,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    render() {
        const inputValues = [
            {

                label: "G (прискорення вільного падіння):",
                name: "g",
                type: "number",
                value: this.state.g
            },
            {

                label: "δ1 (товщина рідини першої плівки):",
                name: "δ1",
                type: "number",
                value: this.state.δ1
            },
            {

                label: "δ2 (товщина рідини першої плівки):",
                name: "δ2",
                type: "number",
                value: this.state.δ2
            },
            {

                label: "p1 (густина рідини першої плівки):",
                name: "p1",
                type: "number",
                value: this.state.p1
            },
            {

                label: "p2 (густина рідини другої плівки):",
                name: "p2",
                type: "number",
                value: this.state.p2
            },
            {

                label: "υ1 (кінематичний коефіцієнти в’язкості рідини першої плівки):",
                name: "υ1",
                type: "number",
                value: this.state.υ1
            },
            {

                label: "υ2 (кінематичний коефіцієнти в’язкості рідини першої плівки):",
                name: "υ2",
                type: "number",
                value: this.state.υ2
            },
            {

                label: "μ1 (динамічний коефіцієнти в’язкості рідини першої плівки):",
                name: "μ1",
                type: "number",
                value: this.state.μ1
            },
            {

                label: "μ2 (динамічний коефіцієнти в’язкості рідини першої плівки):",
                name: "μ2",
                type: "number",
                value: this.state.μ2
            },
            {

                label: "Ge (безрозмірний комплекс, що характеризує вплив газового потоку на плівку):",
                name: "Ge",
                type: "number",
                value: this.state.Ge
            }
            ,
            {

                label: "y (максимальная відстань від пластини):",
                name: "yLength",
                type: "number",
                value: this.state.yLength
            }
        ]
        return (
            <div className="Main">
                <div className="Back-button" onClick={() => this.props.navigateTo()}>
                    <MaterialIcon icon="undo" size={30} color="white" />
                </div>
                <div className="Form-and-chart-container">
                    <div className="Input-form-container">
                        <form className="Input-form">
                            {
                                inputValues.map((inputInfo, index) => {
                                    return (
                                        <label className="Input-label" key={index}>
                                            {inputInfo.label}
                                            <input className="Input" type={inputInfo.type} name={inputInfo.name} value={inputInfo.value} onChange={this.handleChange} onFocus={this.clearInput} />
                                        </label>
                                    )
                                })}
                            <div className="Submit-button" onClick={() => {
                                this.calculateChart()
                            }}>
                                Розрахувати
                        </div>
                        </form>
                    </div>
                    <div className="Chart-container">
                        <canvas ref="myChart" ></canvas>
                    </div>
                </div>
                <div className="Results-container">
                    {this.state.maxSpeed && <div className="Result-line">Максимальне значення швидкості: {this.state.maxSpeed.toFixed(2)}</div>}
                    {this.state.averageSpeed && <div className="Result-line">Середнє значення швидкості: {this.state.averageSpeed.toFixed(2)}</div>}
                    {this.state.geOpt && <div className="Result-line">Ge оптимальне: {this.state.geOpt.toFixed(2)}</div>}
                </div>
            </div>
        );
    }
}

