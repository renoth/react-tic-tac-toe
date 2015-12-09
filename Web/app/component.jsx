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
        if (this.state.winner == null) {
            var newContent = this.props.game.set(this.state.boardContent, this.state.player % 2, i, k);
            this.setState({
                player: this.state.player + 1,
                boardContent: newContent,
                winner: this.props.game.checkBoard(newContent)
            });
        }
        console.log(this.state.player);
    },
    resetGame: function() {
        this.setState({
            player: 0,
            boardContent: this.props.game.createBoard(),
            winner: null
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
        { (this.state.player == 9 || this.state.winner) &&
            <div className="newgame">
                <a onClick={(event) => {this.resetGame()}}>Reset</a>
            </div>
            }
    </div>);
    }
});

var Winner = React.createClass({
    render: function() {

        return (<div>
            {
                this.props.winner && <div className="winner">
                    The winner is {this.props.winner == null ? "" : (this.props.winner.winner == 0 ? "blue" : "red")}
                </div>
                }
        </div>)
    }
});

export default Application;


