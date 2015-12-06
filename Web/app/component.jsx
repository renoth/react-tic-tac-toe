import React from 'react';

var Application = React.createClass({
  render: function() {

    return <Board game={this.props.game} boardContent={this.props.boardContent} >

    </Board>;
  }
});

var Board = React.createClass({
    getInitialState: function() {
        return {
            player: 0,
            winner: null,
            boardContent: this.props.boardContent
        }
    },
    onPressCell: function(i , k, event) {
        var newContent = this.props.game.set(this.state.boardContent, this.state.player % 2, i, k);
        this.setState({
            player: this.state.player + 1,
            boardContent: newContent,
            winner: this.props.game.checkBoard(newContent)
        });
    },
    render : function() {
    return (<div>
        <table className="gameBoard">
        {
            this.state.boardContent.map((element, i) => {
                return <tr>
                    {
                        element.map((item, k) => {
                            return <td className={this.state.boardContent[i][k] != null ? (this.state.boardContent[i][k] == 1 ? "playerTwo" : "playerOne") : ""} onClick={(event) => {this.onPressCell(i, k, event)}}></td>
                            })
                        }
                </tr>;
                })
            }
        </table>
        <Winner winner={this.state.winner}/>
    </div>);
    }
});

var Winner = React.createClass({
    render: function() {
        return (<div className={this.props.winner != null ? "showWinner" : "hideWinner"}>
            The winner is {this.props.winner == null ? "" : this.props.winner.winner}
        </div>)
    }
})

export default Application;


