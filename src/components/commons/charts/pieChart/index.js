import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { PieChart, Pie, Tooltip } from 'recharts';

import Typography from '@material-ui/core/Typography';

import './pieChart.scss';

const data1 = [{ name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
{ name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
{ name: 'Group E', value: 278 }, { name: 'Group F', value: 189 }]


class SimplePieChart extends Component {

    constructor(props) {
        super(props);
        this.state= {
            data: [],
            empty: true,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.data && nextProps.data.length > 0 && nextProps.data !== prevState.data ) {
            return {
                data: nextProps.data,
                empty: false,
            };
        }
    }

    componentDidMount() {
        if (this.props.data && this.props.data.length > 0) {
            this.setState({
                empty: false,
            })
        }
    }

    render() {
        const { empty, data } = this.state;
        return (
            <div>
                {empty && <Typography component="h3">
                   No Data Available
                </Typography>}
                { !empty && <div className="pie-chart-container">
                    <PieChart width={400} height={200} className="pie-chart">
                        <Pie dataKey="tags" startAngle={180} endAngle={0} data={data} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
                        <Tooltip />
                    </PieChart>
                </div >}
            </div>
        );
    }
}

SimplePieChart.propTypes = {
    data: PropTypes.array.isRequired
}

export default SimplePieChart;