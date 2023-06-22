import css from './App.module.css'
import { Component } from 'react';
import FeedbackOptions from 'components/feedbackOptions';
import Statistics from 'components/statistics';
import Section from 'components/section';
import Notification from 'components/notification';

class App extends Component {
    state = {
        good: 0,
        neutral: 0,
        bad: 0
    };

    handleClickIncrement = (type) => {
        this.setState((prevState) => ({
            [type]: prevState[type] + 1
        }));
    };

    countTotalFeedback = () => {
        const { good, neutral, bad } = this.state;
        return good + neutral + bad;
    };

    countPositiveFeedbackPercentage = () => {
        const { good } = this.state;
        const totalFeedback = this.countTotalFeedback();
        return totalFeedback > 0 ? Math.round((good / totalFeedback) * 100) : 0;
    };

  render() {
    const totalFeedback = this.countTotalFeedback();
    
    return (
      <div className={css['app_container']}>
        <Section title="Please leave feedback">
            <ul className={css['btn__list']}>
              {Object.keys(this.state).map((option) => (
                <FeedbackOptions
                  key={option}
                  option={option}
                  handleClickIncrement={this.handleClickIncrement}
                />
              ))}
            </ul>
        </Section>

        <Section title="Statistics">
          {totalFeedback === 0 ? (
            <Notification message="There is no feedback" />
          ) : (
            <div className={css['statistics__container']}>
              <ul>
                {Object.entries(this.state).map(([option, count]) => (
                  <Statistics key={option} option={option} count={count} />
                ))}
                <li key="total">
                  <p className={css['statistics__item-text']}>
                    Total: {this.countTotalFeedback()}
                  </p>
                </li>
                <li key="positive-feedback">
                  <p className={css['statistics__item-text']}>
                    Positive Feedback: {this.countPositiveFeedbackPercentage()}%
                  </p>
                </li>
              </ul>
            </div>
          )}
        </Section>
      </div>
);
  }
}

export default App;