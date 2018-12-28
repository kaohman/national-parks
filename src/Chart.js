import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class Chart extends Component {
    constructor(props){
      super(props)
      this.state = {
          chartData: {
              
          }
      }
    }
    render(){
        return (
            <div className = 'chart'>
            <Bar 
                data={data}
                width={100}
                height={50}
                options={{
                    maintainAspectRatio: false
                }}
             />
            </div>
        )
    }
}

export default Chart  