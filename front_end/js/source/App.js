import React, { Component } from 'react';
import Modal from './Modal';
import Collapsible from "./Collapsible";
import Zones from "./Zones";
import FilterItem from "./FilterItem"
import ProblemForm from "./ProblemForm"

class App extends Component {
    constructor(props) {
      super(props);
      this.toggleFilter = this.toggleFilter.bind(this);
      this.toggleModal = this.toggleModal.bind(this);
      this.clearFIlter = this.clearFIlter.bind(this);
      this.submitAddProblem = this.submitAddProblem.bind(this);
      this.state = {
        items: [],
        isOpen: false, 
        roomNames: {main: "Main room", 
                    dusty: "Dusty room", 
                    bigcnc: "Big CNC room", 
                    welding: "Welding room", 
                    wc: "WC", 
                    kitchen: "Kitchen"},
        filterOptions: ["main", "dusty", "bigcnc", "welding", "wc", "kitchen"],
        filterIndex: null,
        labelColor: ["red", "orange", "yellow"]
      };
    }

    toggleModal(event) {
      const { isOpen } = this.state;
      this.setState({ isOpen: !isOpen });
    };

    allProblems() {
      alert("allProblems");
    };

    submitAddProblem(problem){
      //console.log(problem);
      const URL = window.location.href+"data";
      var xhr = new XMLHttpRequest();
      xhr.open("POST", URL, true);
      xhr.setRequestHeader("Content-type", "application/json");

      xhr.onreadystatechange = function() {
          if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            var data = JSON.parse(xhr.response);
            //console.log(data);
            this.setState({
              items:data,
            });
          }
      }.bind(this);
      console.log(JSON.stringify(problem));
      xhr.send(JSON.stringify(problem)); 

      };

    toggleFilter(index) {
      if (index === this.state.filterIndex) {
        this.setState({filterIndex: null,});
      } else {
        this.setState({filterIndex: index,});
      }
    };

    clearFIlter(){
      this.setState({filterIndex: null,});
    };

    deleteItem(id, event) {
      if (confirm("Are you sure you want to delete this item?")){
        const URL = window.location.href+"data/"+id.toString();
        var xhr = new XMLHttpRequest()
        xhr.open("DELETE", URL, true)
        xhr.onload = function(e){
          if (xhr.readyState === 4){
            if (xhr.status === 200){
              var data = JSON.parse(xhr.response);
              //console.log(data);
              this.setState({
                items:data,
              });
              //alert(data);
            } else {
              console.error(xhr.statusText)
            }
          }
        }.bind(this)

        xhr.onerror = function(e){
              console.error(xhr.statusText)
            }
            xhr.send(null)
      }
    };

    componentDidMount(){
      const URL = window.location.href+"data";
      var xhr = new XMLHttpRequest()
      xhr.open("GET", URL, true)
      xhr.onload = function(e){
        if (xhr.readyState === 4){
          if (xhr.status === 200){
            var data = JSON.parse(xhr.response);
            //console.log(data);
            this.setState({
              items:data,
            });
            //alert(data);
          } else {
            console.error(xhr.statusText)
          }
        }
      }.bind(this)

      xhr.onerror = function(e){
            console.error(xhr.statusText)
          }
          xhr.send(null)
    };



    

  render() {
    const { isOpen, filterOptions, roomNames, filterIndex, labelColor, items} = this.state;
    //const filterOption = filterIndex !== null ? filterOptions[filterIndex];
    const filtered = filterIndex !== null ? 
      items.filter(data => {
        if ( data.room.toLowerCase() === filterOptions[filterIndex].toLowerCase()){
          return data;
        } return false;
      })
      : items;

      const colorsZones = {main: null, 
                    dusty: null, 
                    bigcnc: null, 
                    welding: null, 
                    wc: null, 
                    kitchen: null};
      filterOptions.map(filterOption => {
        items.map(item => {
          if (item.room.toLowerCase() === filterOption.toLowerCase() && item.priority === 3){
            colorsZones[filterOption] = "yellow";
          }
          return true;
        })
        items.map(item => {
          if (item.room.toLowerCase() === filterOption.toLowerCase() && item.priority === 2){
            colorsZones[filterOption] = "orange";
          }
          return true;
        })
        items.map(item => {
          if (item.room.toLowerCase() === filterOption.toLowerCase() && item.priority === 1){
            colorsZones[filterOption] = "red";            
          }
          return true;
        })
        return true;
      });
    return (
      <div className="allsite">
        <div className="header">          
          <label className = "mainLabel">HackLab Problems</label>
          <button onClick={this.toggleModal} className = "butt">All Problems</button>
        </div>
        <div onClick={this.toggleModal} className="mybody">
          <Zones colorsZones={colorsZones}/>
        </div>
        <Modal
          id="modal_with_forms"
          isOpen={isOpen}
          className="Modal"
          shouldFocusAfterRender={false}
          shouldCloseOnOverlayClick={true}
          ariaHideApp={false}
          onRequestClose={this.toggleModal}
          aria={{
            labelledby: "heading",
            describedby: "fulldescription"
          }}>
            <div className="gridcontainer">
              <div className="left" >
                  {filterOptions.map((filterOptionName, i) => {
                      return(
                        <FilterItem 
                          key={i}
                          isChecked={(this.state.filterIndex === i)}
                          text={roomNames[filterOptionName]}
                          index={i}
                          onClck={this.toggleFilter}/>
                        );
                    })}
                  <div style={{
                      marginRight: "5px",
                      marginLeft: "5px",
                      marginTop: "10px",
                      border: "1.5px solid #3500F3",
                      borderRadius: "5px",
                      padding: "10px",  
                      color: "white",
                      background: "#353535"}}
                      onClick={this.clearFIlter}>
                  Clear filter
                  </div>
              </div>
              <div className="middle">
                <Collapsible
                  trigger="Add problem"
                  classParentString="AddProblemCollapsible"
                  transitionTime={300}
                  open={false}
                  >
                <ProblemForm submit={this.submitAddProblem}/>
                </Collapsible>
                <div className="listHolder">
                  {filtered.sort((a, b) => {
                    return a.priority - b.priority;
                  }).map(({id, compactdesc, fulldesc, priority, room}, i) => {
                    const trg = compactdesc.toString() + " | " + roomNames[room.toLowerCase()].toString()
                    return (
                      <Collapsible
                        key={id} 
                        trigger={trg}
                        transitionTime={200}
                        triggerStyle={{background: labelColor[priority-1]}} >
                      <div>
                        {fulldesc}
                        <button key={id} className="removeButton" onClick={this.deleteItem.bind(this, id)}>Remove</button>
                      </div>
                      </Collapsible> 
                    );
                  })}
                  </div>
              </div>
            </div>

        </Modal>
        </div>
    );
  }
}

export default App;
