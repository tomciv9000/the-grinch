import React from 'react';
// I want to import functions from scoring like it's a utility or library - tie the functionality tot he button
export class Score extends React.Component {

  constructor(props) {
    super(props);
  }
 
   

  render() {
    const isGameOver = this.props.isScored;
    if (!isGameOver) {
      return (
        <div className='score-text'>Game In Progress...</div>
      )
    } else {
      return (
        <div className='score-container'>
        <div className='score-space-left'></div>
        <div className='score-table'>
           <table className='final-score-text'>
            <thead>
              <tr>
                <th>Final Score</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(this.props.finalScore).map((category, index) => {
                return (
                  <tr key={index}>
                    <td>{category[0]}: </td>
                    <td>{category[1]}</td>
                  </tr>) 
              })}
            </tbody>
          </table>
        </div>
          <div className='score-space-right'></div>
      </div>
    )
    }
  }
}

export default Score;