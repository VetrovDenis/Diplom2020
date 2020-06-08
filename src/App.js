import React from 'react';
//assets
import books from './assets/images/books.jpg';
import code from './assets/images/code.jpg';
import Pdf from './assets/doc.pdf';
import './App.css';
//components
import NavigationBar from "./components/NavigationBar"
import PracticeBlock from "./components/PracticeBlock"
import NavigationBlock from "./components/NavigationBlock"

export default class App extends React.Component {
  state = {
    navigationRoute: "home"
  }
  navigateTo = (navigationaPath) => {
    this.setState({ navigationRoute: navigationaPath ? navigationaPath : "home" })
  }
  render() {
    return (
      <div className="App">
        <NavigationBar navigateTo={this.navigateTo} />
        {
          this.state.navigationRoute === "home" ?
            <div>
              <header className="App-header">
                <h6>
                  ДНІПРОВСЬКИЙ НАЦІОНАЛЬНИЙ УНІВЕРСИТЕТ
                  ІМЕНІ ОЛЕСЯ ГОНЧАРА
                  ФАКУЛЬТЕТ ПРИКЛАДНОЇ МАТЕМАТИКИ
                  КАФЕДРА ОБЧИСЛЮВАЛЬНОЇ МАТЕМАТИКИ ТА
                  МАТЕМАТИЧНОЇ КІБЕРНЕТИКИ
                </h6>
                <h4>
                  Факультет прикладної математики<br></br>
                  Кафедра обчислювальної математики та математичної кібернетики
                </h4>
                <h4>
                  ДИМПЛОМНА РОБОТА <br></br>
                  Перший (бакалаврський) рівень вищої освіти
                </h4>
                <h1>
                  МОДЕЛЮВАННЯ НЕЛІНІЙНОЇ СИСТЕМИ З УРАХУВАННЯМ ДИСИПАЦІЇ
                </h1>
                <div>
                  <p>Виконав:</p>
                  <p>Студент групи ПА–16–1</p>
                  <p>спеціальності 113 – Прикладна математика</p>
                  <p>Вєтров Денис Максимович</p>

                  <p>Керівник: канд.фіз.-мат. наук, доцент, доцент ПОМ</p>
                  <p>Тонкошкур І.С.</p>
                </div>
                <h6>
                  2020
                </h6>
              </header>
              <div className="App-navigation">
                <NavigationBlock navigateTo={() => window.open(Pdf)} image={books} navigateRoute="theory" title="ТЕОРЕТИЧНА ДОВІДКА" />
                <NavigationBlock navigateTo={this.navigateTo} image={code} navigateRoute="practice" title="ПРАКТИЧНА ЧАСТИНА" />
              </div>
            </div>
            :
            this.state.navigationRoute === "practice" ?
              <PracticeBlock image={code} /> :
              null
        }
      </div>
    );
  }
}

