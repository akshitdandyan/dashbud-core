import {
    XYPlot,
    LineSeries,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    CircularGridLines,
} from "react-vis";

const data = [
    { x: 0, y: 0 },
    { x: 1, y: 5 },
    { x: 2, y: 4 },
    { x: 3, y: 9 },
    { x: 4, y: 1 },
    { x: 5, y: 7 },
    { x: 6, y: 6 },
    { x: 7, y: 3 },
    { x: 8, y: 2 },
    { x: 9, y: 0 },
];

const Dashboard: React.FC = () => {
    return (
        <div className="">
            <XYPlot height={300} width={300}>
                <LineSeries
                    style={{ fill: "none" }}
                    data={data}
                    stroke={"blue"}
                    animation="gentle"
                />
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
            </XYPlot>
            <XYPlot height={200} width={200}>
                <VerticalBarSeries barWidth={1} data={data} />
            </XYPlot>
        </div>
    );
};

export default Dashboard;
