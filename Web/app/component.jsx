import React from 'react';

var Application = React.createClass({
  render: function() {

    return <Board game={this.props.game} boardContent={this.props.boardContent} >

    </Board>;
  }
});

var Board = React.createClass({
    getInitialState: function() {
        return {player: 0,winner: null, boardContent: this.props.boardContent}
    },
    onPressCell: function(i , k, event) {
        console.log("Player " + this.state.player);

        var newContent = this.props.game.set(this.state.boardContent, this.state.player % 2, i, k);
        this.setState({player: this.state.player + 1, boardContent: newContent});

        if (this.props.game.checkBoard(this.state.boardContent)) {
            this.state.winner = this.props.game.checkBoard(this.state.boardContent);

        }
    },
    render : function() {
    return (<div>
        <table>
        {
            this.state.boardContent.map((element, i) => {
                return <tr>
                    {
                        element.map((item, k) => {
                            return <td className="cell" onClick={(event) => {this.onPressCell(i, k, event)}}>{item == null ? "Click me!" : item}</td>
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
        console.log(this.props.winner);
        return (<div className={this.props.winner != null ? "showWinner" : "hideWinner"}>
            The winner is {this.props.winner == null ? "" : this.props.winner.winner}
        </div>)
    }
})

export default Application;


