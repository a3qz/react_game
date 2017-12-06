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
var firebase = require('firebase');
var config = {
	apiKey: "AIzaSyAOIrw-yoWwGlIUENrT9JYhm4VFNCUfhyE",
	databaseURL: "https://fir-demo-79a1f.firebaseio.com/",
	storageBucket: "",
  };
var app = firebase.initializeApp(config);
var list = ["A", "B", "C", "D", "E"];
for(var i in list){

	//console.log(app.database().ref(list[i]).update({team1player1:"", team1player2:"", team2player1:"", team2player2:"", team1score:0, team2score:0}));
}

class App extends Component {
	
	setup(){
		var parent = this;
		app.database().ref(parent.state.room == ""?"A":parent.state.room).on('value', function(dataSnapshot) { 
			console.log("CALLED" );
			console.log("data:", dataSnapshot.val());
			var x = dataSnapshot.val();
			//parent.state.setState(dataSnapshot.val().team1player1
			parent.setState(function(prevstate, props){return {team1player1:x.team1player1,
				team1player2:x.team1player2,
				team2player1:x.team2player1,
				team2player2:x.team2player2,
				team1score:x.team1score,
				team2score:x.team2score
				}})	
		
		})
	}

constructor(props) {
  super(props);
  document.body.style.backgroundColor = "#2e9858";
  this.items = [{"Name":"Ryan"}];
 
  this.state = {
  items:[],
  gameslist:[],
    color: props.initialColor,
	heightstring: "800px",
	allgames:[],
	pairings:[],
	team2score: 0,
	team1score: 0,
	team1player1: "",
	team2player2: "",
	team1player2: "",
	team2player1: "",
	room: ""
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
this.setup();

}


  render() {
  var parent = this;
  
    return (
      <div className="App" style={{"background-color":"#2e9858", "height" :this.state.heightstring}}>
	  
	  <img src={topimage} alt={"test"} style={{ "height": "300px", "width":"100%"}}/>
	  <div style={{"background-color":"#F44336", "height": "20px", "width":"100%"}}></div>
        	<Tabs forceRenderTabPanel defaultIndex={0} >
		<TabList>
			<Tab>Players</Tab>
			<Tab>Games</Tab>
			<Tab>Tournament</Tab>
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
			<TabPanel style={{width:"50%", margin:0 }}>
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
			<Dropdown options={list.map(function(item){
				return {value:item, label:item}
			})} onChange={function(event){
				app.database().ref(parent.state.room == ""?"A":parent.state.room).off('value', function(dataSnapshot) { 
					console.log("CALLED" );
					console.log("data:", dataSnapshot.val());
					var x = dataSnapshot.val();
					//parent.state.setState(dataSnapshot.val().team1player1
					parent.setState(function(prevstate, props){return {team1player1:x.team1player1,
						team1player2:x.team1player2,
						team2player1:x.team2player1,
						team2player2:x.team2player2,
						team1score:x.team1score,
						team2score:x.team2score
						}})	
				
				})
				parent.setState(function(prevstate, props){return {room: event.value}})
				app.database().ref(event.value).on('value', function(dataSnapshot) { 
					console.log("CALLED" );
					console.log("data:", dataSnapshot.val());
					var x = dataSnapshot.val();
					//parent.state.setState(dataSnapshot.val().team1player1
					parent.setState(function(prevstate, props){return {team1player1:x.team1player1,
						team1player2:x.team1player2,
						team2player1:x.team2player1,
						team2player2:x.team2player2,
						team1score:x.team1score,
						team2score:x.team2score
						}})	
				
				})
				app.database().ref(event.value).once('value', function(dataSnapshot) { 
					console.log("CALLED" );
					console.log("data:", dataSnapshot.val());
					var x = dataSnapshot.val();
					//parent.state.setState(dataSnapshot.val().team1player1
					parent.setState(function(prevstate, props){return {team1player1:x.team1player1,
						team1player2:x.team1player2,
						team2player1:x.team2player1,
						team2player2:x.team2player2,
						team1score:x.team1score,
						team2score:x.team2score
						}})	
				
				})
				
				}} value={parent.state.room} placeholder="Select Room" />
			<Dropdown options={parent.state.items.map(function(item){
				return {value:item.Netid, label:item.Name}
			})} onChange={function(event){parent.setState(function(prevstate, props){return {team1player1: event.value}});app.database().ref(parent.state.room).update({team1player1:event.value})}} value={parent.state.team1player1} placeholder="Select Team 1 Player 1" />
				<Dropdown options={parent.state.items.map(function(item){
				return {value:item.Netid, label:item.Name}
			})} onChange={function(event){parent.setState(function(prevstate, props){return {team1player2: event.value}}); app.database().ref(parent.state.room).update({team1player2:event.value})}} value={parent.state.team1player2} placeholder="Select Team 1 Player 2" />
				
				<div id="score1">
					<button className="decScore" onClick={function(){
						app.database().ref(parent.state.room).update({team1score:parent.state.team1score-1});
							//parent.setState(function(prevstate, props){return {team1score: prevstate.team1score-1}})
					}}>-</button>
					<input type="number" id="team1Score" value={parent.state.team1score} min="0" max="13"></input>
					<button className="incScore" onClick={function(){
						app.database().ref(parent.state.room).update({team1score:parent.state.team1score+1});
							//parent.setState(function(prevstate, props){return {team1score: prevstate.team1score+1}})
					}}>+</button>
				</div>
				<div>
					<button className="decScore" onClick={
					function(){
						app.database().ref(parent.state.room).update({team2score:parent.state.team2score-1});
							//parent.setState(function(prevstate, props){return {team2score: prevstate.team2score-1}})
					}
					}>-</button>
					<input type="number" id="team2Score" value={parent.state.team2score} min="0" max="13"></input>
					<button className="incScore" onClick={function(){
							app.database().ref(parent.state.room).update({team2score:parent.state.team2score+1});
							//parent.setState(function(prevstate, props){return {team2score: prevstate.team2score+1}});
					}}>+</button>
				</div>
				<Dropdown options={parent.state.items.map(function(item){
				return {value:item.Netid, label:item.Name}
			})} onChange={function(event){parent.setState(function(prevstate, props){return {team2player1: event.value}});app.database().ref(parent.state.room).update({team2player1:event.value})}} value={parent.state.team2player1} placeholder="Select Team 2 Player 1" />
				<Dropdown options={parent.state.items.map(function(item){
				return {value:item.Netid, label:item.Name}
			})} onChange={function(event){parent.setState(function(prevstate, props){return {team2player2: event.value}}); app.database().ref(parent.state.room).update({team2player2:event.value})}} value={parent.state.team2player2} placeholder="Select Team 2 Player 2" />
			<div>
				
			</div>
			</TabPanel>
			</Tabs>
		</TabPanel>
		<TabPanel>
		<button id="makeTourny" onClick={
		function(text){
			var data = {
			"netid":"asdf"
			}
			console.log("tourny")
			$.ajax({
				type: "POST",
				data: JSON.stringify(data),
				url: "https://test-cse30246.azurewebsites.net/api/HttpTriggerCSharp2?code=YvOorCUyGOMa8p6HXM1R78DSK74lUMhOK82N2zaxZ6abBOF6HiW1TQ==",
				success: function (text) {
						parent.setState(
							function(prevstate, props){
								return {allgames:text.map(function(i){
									return i
										})
								}
							})


					var playerGameStats = {}; //key = netid, value 0 = sum, 1 = num games
					var playerGameCount = {};
					var playerElo = {};
					var names = new Set();
					for (var i = 0; i<parent.state.allgames.length; i++){
						playerGameStats[parent.state.allgames[i][1]] = 0;
						playerGameStats[parent.state.allgames[i][2]] = 0;
						playerGameStats[parent.state.allgames[i][4]] = 0;
						playerGameStats[parent.state.allgames[i][5]] = 0;
						playerGameCount[parent.state.allgames[i][1]] = 0;
						playerGameCount[parent.state.allgames[i][2]] = 0;
						playerGameCount[parent.state.allgames[i][4]] = 0;
						playerGameCount[parent.state.allgames[i][5]] = 0;
						names.add(parent.state.allgames[i][1]);
						names.add(parent.state.allgames[i][2]);
						names.add(parent.state.allgames[i][4]);
						names.add(parent.state.allgames[i][5]);
					}
					for (var i = 0; i<parent.state.allgames.length; i++){
						//add players opponents elo
						//figure out who wins and add/subtrack 400 to that sum
						if (parent.state.allgames[i][3] > parent.state.allgames[i][6]){
							playerGameStats[parent.state.allgames[i][1]] += 1900;
							playerGameStats[parent.state.allgames[i][2]] += 1900;
							playerGameStats[parent.state.allgames[i][4]] += 1100;
							playerGameStats[parent.state.allgames[i][5]] += 1100;
						}
						else {
							playerGameStats[parent.state.allgames[i][4]] += 1900;
							playerGameStats[parent.state.allgames[i][5]] += 1900;
							playerGameStats[parent.state.allgames[i][1]] += 1100;
							playerGameStats[parent.state.allgames[i][2]] += 1100;
						}
						playerGameCount[parent.state.allgames[i][1]]++;
						playerGameCount[parent.state.allgames[i][2]]++;
						playerGameCount[parent.state.allgames[i][4]]++;
						playerGameCount[parent.state.allgames[i][5]]++;
					}
					for (let item of names){
						playerElo[item] = playerGameStats[item] / playerGameCount[item];
					}
					var sortedPlay = [];
					var revSortedPlay = [];
					for (var player in playerElo) {
    				sortedPlay.push([player, playerElo[player]]);
						revSortedPlay.push([player, playerElo[player]]);
					}

					sortedPlay.sort(function(a, b) {
    				return a[1] - b[1];
					});
					revSortedPlay.sort(function(a, b) {
    				return b[1] - a[1];
					});
					var emptyPairings = [];
					for (var i = 0; i < sortedPlay.length/2; i++){
						emptyPairings.push([sortedPlay[i][0], revSortedPlay[i][0]]);
					}

					parent.setState(
						function(prevstate, props){
							return {pairings:emptyPairings.map(function(i){
								return {"Team Member 1":i[0], "Team Member 2": i[1]}
									})
							}
						})
					console.log(parent.state.pairings);

					},
				headers: {"Content-Type": "application/json"}
				}
			);
			}
		}>Make Tournament</button>
		<center><JsonTable rows={this.state.pairings} style={{"margin-left":"600px" }}/></center>


		</TabPanel>
	</Tabs>
      </div>
    );
  }
}

export default App;
