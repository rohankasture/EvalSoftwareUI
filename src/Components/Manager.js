import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Table, TableBody, TableCell, TableRow, TableHead } from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import Detail from './Detail';

const styles = theme => ({
    card: {
        height: '90%',
        maxHeight: '700px',
        width: '100%',
        minWidth: '750px',
        overflow: 'auto'
    },
    table: {
        height: '70%',
    },
    content: {
        height: '90%',
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        width: '100px',
        height: '30px',

    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },

    text: {
        verticalAlign: "top",
        textAlign: "left"
    },

    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "100%",
    },
    label: {
        display: 'flex',
        justifyContent: 'flex-end',
    },

});
let id = 0;
function createData(name, state_name) {
    id += 1;
    return { id, name, state_name };
}

const rows = [
    createData("Approachable", "approachable_attitude"), createData("Communication", "team_communication"), createData("Client Interaction", "client_interaction"), createData("Decision Making", "decision_making"), createData("Resource Utilization", "resource_utilization"), createData("Follow up to completion", "follow_up_to_completion"),
    createData("Task Delegation & Ownership", "task_delegation_and_ownership"), createData("Encourage Team Development", "encourage_team_development"), createData("Realistic Expectation", "realistic_expectation"), createData("Performance Under Stress", "performance_under_stress")
];


class Manager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
        };

    }

    render() {
        const { classes } = this.props;
        if (this.props.back) {
            console.log("change ui")
            return (
                <Detail handleTokenChange={this.props.handleTokenChange}
                    handleAdjectiveChange={this.props.handleAdjectiveChange}
                    handleDone={this.props.handleDone}
                    handleChange={this.props.handleChange}
                    sumTokenFlag={this.props.sumTokenFlag}
                    error={this.props.error}
                    selectedUser={this.props.selectedUser}
                    options={this.props.options}
                    handleNext={this.props.handleNext}
                    next={this.props.next}
                    token={this.props.token}
                    description={this.props.description}
                />
            );

        }
        return (
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Grid container direction="column" spacing={24}>
                        <Grid item>
                            <Typography variant="h6" color="textPrimary" className={classes.text} >
                                Rate your manager on following  qualities.
							</Typography>
                        </Grid>
                        <Grid item>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell> </TableCell>
                                        <TableCell >Outstanding</TableCell>
                                        <TableCell >Strong</TableCell>
                                        <TableCell >Average</TableCell>
                                        <TableCell >Weak</TableCell>
                                        <TableCell >Terrible</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map(row => {
                                        return (
                                            <TableRow key={row.id}>
                                                <TableCell> {row.name}</TableCell>
                                                <TableCell>
                                                    <Radio
                                                        checked={this.props.selectedUser[row.state_name] === '1'}
                                                        onChange={this.props.handleChange}
                                                        value="1"
                                                        name={row.state_name}
                                                        aria-label="A"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Radio
                                                        checked={this.props.selectedUser[row.state_name] === '2'}
                                                        onChange={this.props.handleChange}
                                                        value="2"
                                                        name={row.state_name}
                                                        aria-label="A"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Radio
                                                        checked={this.props.selectedUser[row.state_name] === '3'}
                                                        onChange={this.props.handleChange}
                                                        value="3"
                                                        name={row.state_name}
                                                        aria-label="A"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Radio
                                                        checked={this.props.selectedUser[row.state_name] === '4'}
                                                        onChange={this.props.handleChange}
                                                        value="4"
                                                        name={row.state_name}
                                                        aria-label="A"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Radio
                                                        checked={this.props.selectedUser[row.state_name] === '5'}
                                                        onChange={this.props.handleChange}
                                                        value="5"
                                                        name={row.state_name}
                                                        aria-label="A"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                    <Grid item>
                      
                            <div className={classes.label}>
                                <Typography variant="body2" color="error" className={classes.text}>"Error"</Typography>
                            </div>

                            <div className={classes.buttons}>
                                <Button color="secondary" variant='contained' className={classes.button} onClick={this.props.handleBack}> Back</Button>
                                <Button color="secondary" variant='contained' className={classes.button} onClick={this.props.handleDone}> Done</Button>
                            </div>
                        
                    </Grid>
                    
                </CardContent>
            </Card>
        );
    }
}
Manager.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Manager);
