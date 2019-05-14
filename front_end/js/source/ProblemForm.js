import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProblemForm extends Component {
	constructor(props){
		super(props)
		this.state = {
			shortdescription: "",
			fulldescription: "",
			room: "main",
			priority: "red",
    	};
    	this.handleInputChange = this.handleInputChange.bind(this);
    	this.addProblem = this.addProblem.bind(this);
	}

	handleInputChange(event) {
	    const target = event.target;
	    const name = target.name;

	    this.setState({
	      [name]: target.value
	    });
  	}

  	addProblem(){
  		if (this.state.shortdescription === ""){
  			alert("Short description must be filled");
  		}
  		else{
  		const problem = {
  			room: this.state.room,
  			compactdesc: this.state.shortdescription,
  			fulldesc: this.state.fulldescription !== "" ? this.state.fulldescription
  						: "Have not details :(",
  			priority: this.state.priority === "red" ? 1 
  						: this.state.priority === "orange" ? 2
  						: 3 ,
  		};
  		this.props.submit(problem);
  		}
  	}

	render(){
		const { shortdescription, fulldescription, room, priority} = this.state;
		return(
			<div style={{height: "100%", display:"flex", flexDirection: "column", width: "100%"}}>
				<div className="FirstRowHolder">
				<label className="ShortDescLabel">
					Short description: 
					<input 
						type="text"
						value={shortdescription}
						placeholder="Short description"
						name="shortdescription"
						onChange={this.handleInputChange}/>
				</label>
				<label className="RoomSelectLabel">
				Room:
				<select
					value={room}
					name="room"
					onChange={this.handleInputChange}>
				  <option value="wc">WC</option>
				  <option value="kitchen">Kitchen</option>
				  <option value="bigcnc">Big CNC room</option>
				  <option value="main">Main room</option>				  
				  <option value="welding">Welding room</option>
				  <option value="dusty">Dusty room</option>
				</select>
				</label>
				<label className="PrioritySelectLabel">
				Priority:
				<select
					value={priority}
					name="priority"
					onChange={this.handleInputChange}>
				  <option value="yellow">Yellow</option>
				  <option value="orange">Orange</option>
				  <option value="red">Red</option>
				</select>
				</label>
			</div>
				<label className="FullDescLabel" >
					Full description:
					<textarea
						placeholder="Full description"
						name="fulldescription"
						onChange={this.handleInputChange}>
					{fulldescription}
					</textarea>
				<button onClick={this.addProblem}>Add problem</button>
				</label>
			</div>
		);
	}


}

ProblemForm.propTypes = {
  submit: PropTypes.func,
}

ProblemForm.defaultProps = {
  submit: () => {},
};

export default ProblemForm;