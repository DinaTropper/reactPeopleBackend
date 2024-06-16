import React from 'react';
import AddPerson from './AddPerson';
import PersonRow from './PersonRow';
import { produce } from 'immer';
import axios from 'axios';

class PeopleManager extends React.Component {

    state = {
        person: {
            FirstName: '',
            LastName: '',
            Age: ''
        },
        People: [],
        checkedPeople: [],
        isEdit: false,
    }
    componentDidMount = async() => {
       await this.loadPeople();
        console.log(this.state.People)
    }

    loadPeople = () => {
        axios.get('/api/home/getall').then(response => {
            this.setState({ People: response.data });

        })
    }
    onTextChange = e => {
        const copy = this.state.person;
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
        
    }
    
    onCancelClick = () => {
        this.setState({ isEdit: false, person: { id: '', FirstName: '', LastName: '', Age: '' } });
    };

    onAddClicked = () => {
        const { People, person } = this.state;
        const { id, FirstName, LastName, Age } = this.state.person;
        axios.post("/api/home/addperson", { id, FirstName, LastName, Age}).then(response => {
            this.setState({ People: [...People, person], person: { FirstName: '', LastName: '', Age: '' } });
            this.loadPeople();
        });
        console.log(People);
    }

    onEditClicked = (p) => {
        this.setState({
            isEdit: true,
            person: {
                FirstName: p.FirstName,
                LastName: p.LastName,
                Age: p.Age
            }
        })
        this.loadPeople();
    };
    onDeleteClicked = (p) => {
        axios.post('/api/home/deleteperson', { person }).then(response => {
            this.loadPeople();
        });
    };
    onCheckAllClicked = () => {
        this.setState({ checkedPeople: this.state.People.map(p => p.id) })
    }
    onUncheckAllClicked = () => {
        this.setState({ checkedPeople: [] })
    }

    onCheckToggle = (p) => {
        const { checkedPeople } = this.state;

        if (checkedPeople.includes(p)) {
            this.setState({ checkedPeople: checkedPeople.filter(c => c !== p) });
        }
        else {
            this.setState({ checkedPeople: [...checkedPeople, p] });
        }
    }

    onDeleteAllCheckedClicked = (p) => {
        const { checkedPeople } = this.state;
        axios.post('/api/home/deleteperson', checkedPeople.forEach(person => person.id)).then(response => {
            this.loadPeople();
        });
    }


    render() {


        const { People, isEdit, person, checkedPeople } = this.state;

        return (
            <>
                <AddPerson
                    key={person.id}
                    FirstName={person.FirstName}
                    LastName={person.LastName}
                    Age={person.Age}
                    onAddClicked={this.onAddClicked}
                    onTextChange={this.onTextChange}
                    onCancelClick={this.onCancelClick}
                    onEditClicked={this.onEditClicked}
                    isEdit={isEdit}

                />
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>
                                <button onClick={this.onDeleteAllCheckedClicked} className="btn btn-danger w-100">Delete checked boxes</button>
                                <button onClick={this.onCheckAllClicked} className="btn btn-outline-danger w-100 mt-2">Check All</button>
                                <button onClick={this.onUncheckAllClicked} className="btn btn-outline-danger w-100 mt-2">Uncheck All</button>
                            </th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {People.map(p => <PersonRow
                            key={p.id}
                            person={p}
                            onEditClicked={() => this.onEditClicked(p)}
                            onDeleteClicked={() => this.onDeleteClicked(p)}
                            isEdit={isEdit}
                            checked={checkedPeople.includes(p.id)}
                            onCheckToggle={() => this.onCheckToggle(p)}
                        />
                        )}
                    </tbody>
                </table>
            </>
        )
    }
}
export default PeopleManager;