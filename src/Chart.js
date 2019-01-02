import React, { Component } from 'react';
import Bar from 'react-chartjs-2';


class Chart extends Component {
    constructor(props){
      super(props)
 
    }


    render(){
       const data = {
            labels:['State Population', 'Annual Park Visitors in State'],
            datasets:[
              this.props.statePopulation,
              this.props.currentStateAnnualVisitors
            ]
        }
        const options={
            maintainAspectRatio: false
        }
        return (
            <div className = 'chart'>
            <Bar 
                data={data}
                width={200}
                height={150}
                options={options}
             />
            </div>
        )
    }
}

export default Chart  
