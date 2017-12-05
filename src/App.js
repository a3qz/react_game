import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import $ from 'jquery';
import JsonTable from 'react-json-table';
import topimage from './Capture.PNG';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class App extends Component {
	
	

constructor(props) {
  super(props);
  document.body.style.backgroundColor = "#2e9858";
  this.items = [{"Name":"Ryan"}];
 
  this.state = {
  items:[],
  gameslist:[],
    color: props.initialColor,
	heightstring: "800px",
	team2score: 0,
	team1score: 0,
	team1player1: "",
	team2player2: "",
	team1player2: "",
	team2player1: ""
  };
  var myparent = this;
  // names
  $.ajax({
			type: "POST",
            data: JSON.stringify({}),
			url: "https://test-cse30246.azurewebsites.net/api/ViewPlayers?code=shSYu/2Q/NH/7JgcIassjqsYhF2/0ot79wviaqbx6hCOG6aUiqxV6Q==",
			success: function (text) { 
			
				myparent.setState(function(prevstate, props){return {items:text.map(function(i){
						return {"Name":i[0], "Netid": i[1]}
					}
				)}})
				

			console.log(text)
			},
			headers: {"Content-Type": "application/json"}

		});
// games


}


  render() {
  var parent = this;
  console.log(this.items)
    return (
      <div className="App" style={{"background-color":"#2e9858", "height" :this.state.heightstring}}>
	  
	  <img src={topimage} alt={"test"} style={{ "height": "300px", "width":"100%"}}/>
	  <div style={{"background-color":"#F44336", "height": "20px", "width":"100%"}}></div>
        	<Tabs forceRenderTabPanel defaultIndex={0} >
		<TabList>
			<Tab>Players</Tab>
			<Tab>Games</Tab>
		</TabList>
		<TabPanel>
		<Tabs>
		<TabList>
			<Tab>Add a Player</Tab>
			<Tab>View Players</Tab>
		</TabList>
			<TabPanel>
				<div id="addPlayer">
					Full Name <input type="text" id="fullName"/><br/>
					Net ID    <input type="text" id="netID"/><br/>
					<button id="addPlayerButton" onClick={function(){

					var fullName = $("#fullName").val();
							var netID = $("#netID").val();
							console.log(fullName);
							console.log(netID);
							var data = {
								"name": fullName,
								"netid": netID
							}
							$.ajax({
								type: "POST",
								url: "https://test-cse30246.azurewebsites.net/api/HttpTriggerCSharp1?code=Y7E52KmcaPJ8buipNlxRUsJBvUb2YhUdy619QqYa/6O57QVUfMeaAQ==",
								data: JSON.stringify(data),
								success: function () { console.log("success");},
								dataType: "application/json"
							});
					}

					} >Submit</button>
				</div>
			</TabPanel>
			<TabPanel style={{width:"800px", margin:0 }}>
				<div id="allGameTable" style={{width:"800px", "margin-left":"600px" }}>
				
					<JsonTable rows={this.state.items} style={{"background-color":"#2e9858", "height" :"100%", "margin-left":"600px"}}/>
				</div>
			</TabPanel>
		</Tabs>
		</TabPanel>
		<TabPanel>
		<Tabs>
		<TabList>
			<Tab>View Games</Tab>
			<Tab>Add a Game</Tab>
			<Tab>Update a Game</Tab>
			<Tab>Delete a Game</Tab>
			<Tab>Scorekeeper</Tab>
		</TabList>
			<TabPanel>
				<button id="displayGames" onClick={
				function(text){
					var data = {
					"netid": $("#query").val()
					}
					console.log("Displayes")
					$.ajax({
						type: "POST",
						data: JSON.stringify(data),
						url: "https://test-cse30246.azurewebsites.net/api/ViewRawGames?code=LL4KqwnGkhRtkninPjYRtHTLtHPr1lYYkHejWQ7idA4edTV6o80uEQ==",
						success: function (text) { 
							console.log((text));
								parent.setState(
									function(prevstate, props){
										return {games:text.map(function(i){
											return i
												})
										}
										})

								
							
							},
							
						headers: {"Content-Type": "application/json"}

						}
					);
					}
				
					}>Display Games</button>
				<input type="text" id="query"/>
				<JsonTable rows={this.state.games} style={{"margin-left":"600px" }}/>
			</TabPanel>
			<TabPanel>
				<div id="addGame">
					Add Game
					<br/>
					Team 1 Score <input type="text" id="team1Score"/><br/>
					Team 2 Score <input type="text" id="team2Score"/><br/>
					Team 1 Player 1 ID <input type="text" id="t1p1NetID"/><br/>
					Team 1 Player 2 ID <input type="text" id="t1p2NetID"/><br/>
					Team 2 Player 1 ID <input type="text" id="t2p1NetID"/><br/>
					Team 2 Player 2 ID <input type="text" id="t2p2NetID"/><br/>

					<button id="addGameButton" onClick={
						function (){
		var data = {
			"team1score": $("#team1Score").val(),
			"team2score": $("#team2Score").val(),
			"team1": {
				"partner1netid": $("#t1p1NetID").val(),
				"partner2netid": $("#t1p2NetID").val(),
				"partner1score": "5",
				"partner2score": "5",
				"teamnumber" : "1"
			},
			"team2":
			{
				"partner1netid": $("#t2p1NetID").val(),
				"partner2netid": $("#t2p2NetID").val(),
				"partner1score": "2",
				"partner2score": "2",
				"teamnumber" : "2"
			}
		}
		$.ajax({
			type: "POST",
			url: "https://prod-28.eastus.logic.azure.com:443/workflows/b85036662ad042deb191ebd51dda5394/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=40vw--ScvCGpV5L5ETsPFsG-8kFfPqdGsw2bFVJxlvg",
			data: JSON.stringify(data),
			success: function () { console.log("success");},
			dataType: "application/json",
			headers: {"Content-Type": "application/json"}
		});
	}
					
					} >Submit</button>
				</div>
			</TabPanel>
			<TabPanel>
				Game ID <input type="text" id="gameidupdate"/><br/>
				Team 1 Score <input type="text" id="team1ScoreUpdate"/><br/>
				Team 2 Score <input type="text" id="team2ScoreUpdate"/><br/>
				Team 1 Player 1 ID <input type="text" id="t1p1NetIDUpdate"/><br/>
				Team 1 Player 2 ID <input type="text" id="t1p2NetIDUpdate"/><br/>
				Team 2 Player 1 ID <input type="text" id="t2p1NetIDUpdate"/><br/>
				Team 2 Player 2 ID <input type="text" id="t2p2NetIDUpdate"/><br/>

				<button id="updateGameButton" onClick={
				function (){
		var data = {
			"gameid": $("#gameidupdate").val(),
			"team1score": $("#team1ScoreUpdate").val(),
			"team2score": $("#team2ScoreUpdate").val(),
			"team1": {
				"partner1netid": $("#t1p1NetIDUpdate").val(),
				"partner2netid": $("#t1p2NetIDUpdate").val(),
				"partner1score": "5",
				"partner2score": "5",
				"teamnumber" : "1"
			},
			"team2":
			{
				"partner1netid": $("#t2p1NetIDUpdate").val(),
				"partner2netid": $("#t2p2NetIDUpdate").val(),
				"partner1score": "2",
				"partner2score": "2",
				"teamnumber" : "2"
			}
		}
		$.ajax({
			type: "POST",
			url: "https://prod-00.eastus.logic.azure.com:443/workflows/10c0095627844a3cb116af9ea33d270f/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=4665IkF2cSMgJzmTdh5Il9-eBG7GzXWM4FTVH8exmoQ",
			data: JSON.stringify(data),
			success: function () { console.log("success");},
			dataType: "application/json",
			headers: {"Content-Type": "application/json"}
		});
	}
				
				
				}	>Submit</button>
			</TabPanel>
			<TabPanel>
				<button id="deleteGame" onClick={
				function(){
		var data = {
			"gameid": $("#deleteGameQuery").val()
		}

		$.ajax({
			type: "POST",
			data: JSON.stringify(data),
			url: "https://test-cse30246.azurewebsites.net/api/DeleteGame?code=tuX1nVriL6i7nYmF3/bASm6gUnczSZMJt4kcyD40tOF7hdPwDyHArw==",
			headers: {"Content-Type": "application/json"}

		});
	}
				
				}>Delete Game</button>
				<input type="text" id="deleteGameQuery"/>
			</TabPanel>
			<TabPanel>
			<Dropdown options={parent.state.items.map(function(item){
				return {value:item.Netid, label:item.Name}
			})} onChange={this._onSelect} value={""} placeholder="Select Team 1 Player 1" />
				<Dropdown options={parent.state.items.map(function(item){
				return {value:item.Netid, label:item.Name}
			})} onChange={this._onSelect} value={""} placeholder="Select Team 1 Player 2" />
				
				<div id="score1">
					<button className="decScore" onClick={function(){
							parent.setState
							(function(prevstate, props){return {team1score: prevstate.team1score-1}})
					}}>-</button>
					<input type="number" id="team1Score" value={parent.state.team1score} min="0" max="13"></input>
					<button className="incScore" onClick={function(){
							parent.setState
							(function(prevstate, props){return {team1score: prevstate.team1score+1}})
					}}>+</button>
				</div>
				<div>
					<button className="decScore" onClick={
					function(){
							parent.setState
							(function(prevstate, props){return {team2score: prevstate.team2score-1}})
					}
					}>-</button>
					<input type="number" id="team2Score" value={parent.state.team2score} min="0" max="13"></input>
					<button className="incScore" onClick={function(){
							parent.setState
							(function(prevstate, props){return {team2score: prevstate.team2score+1}})
					}}>+</button>
				</div>
				<Dropdown options={parent.state.items.map(function(item){
				return {value:item.Netid, label:item.Name}
			})} onChange={this._onSelect} value={""} placeholder="Select Team 2 Player 1" />
				<Dropdown options={parent.state.items.map(function(item){
				return {value:item.Netid, label:item.Name}
			})} onChange={function(event){console.log()}} value={""} placeholder="Select Team 2 Player 2" />
			</TabPanel>
			</Tabs>
		</TabPanel>

	</Tabs>
      </div>
    );
  }
}

export default App;
