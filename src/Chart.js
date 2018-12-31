import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class Chart extends Component {
    constructor(props){
      super(props)
   
    }
  
    render(){
        return (
            <div className = 'chart'>
            <Bar 
                data={this.props.selectedState}
                width={100}
                height={150}
                options={{
                    maintainAspectRatio: false
                }}
             />
            </div>
        )
    }
}

export default Chart  