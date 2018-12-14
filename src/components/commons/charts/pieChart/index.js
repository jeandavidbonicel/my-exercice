import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { PieChart, Pie, Tooltip } from 'recharts';

import Typography from '@material-ui/core/Typography';

import './pieChart.scss';


class SimplePieChart extends Component {

    constructor(props) {
        super(props);
        this.state= {
            data: [],
            empty: true,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data && nextProps.data.length > 0 && 
            (nextProps.data === prevState.data || prevState.data.length === 0)) {
            return {
                data: nextProps.data,
                empty: false,
            };
        }

        return null;
    }

    componentDidMount() {
        if (this.props.data && this.props.data.length > 0) {
            this.setState({
                data: this.props.data,
                empty: false,
            });
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
                        <Pie dataKey="value" startAngle={180} endAngle={0} data={data.slice()} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
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