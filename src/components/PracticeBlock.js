import React from 'react';
import './Components.css';
//assets
import steelplate from '../assets/images/steelplate.jpg';
import sheet from '../assets/images/sheet.jpg';
//components
import NavigationBlock from "./NavigationBlock"
import PracticeProgramm from './practice-components/PracticeProgramm';


export default class PracticeBlock extends React.Component {
    state = {
        navigationPracticeRoute: "home"
    }
    navigatePracticeTo = (navigationaPath) => {
        this.setState({ navigationPracticeRoute: navigationaPath ? navigationaPath : "home" })
    }
    render() {
        let style = {
            backgroundImage: `url(${this.props.image})`,
            backgroundPosition: 'center',
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        };
        return (
            <div className="Main-block">
                <div className="Practice-inner">
                    <div className="Practice-header">
                        Практична частина
                    </div>
                    {this.state.navigationPracticeRoute === "home" ?
                        <div className="Practice-navigation">
                            <NavigationBlock
                                navigateTo={this.navigatePracticeTo}
                                image={sheet}
                                navigateRoute="sheet"
                                title={("Задача про течію двох плівок по поверхні пластини").toUpperCase()} />
                            <NavigationBlock
                                navigateTo={this.navigatePracticeTo}
                                image={steelplate}
                                navigateRoute="cylinder"
                                title={("Задача про течію двошарової плівки нелінійно-в’язкої рідини по поверхні пластини").toUpperCase()} />
                        </div>
                        :
                        <div className="Practice-programm">
                            <PracticeProgramm navigateTo={this.navigatePracticeTo} />
                        </div>}
                </div>
            </div>
        );
    }
}

