import React from 'react';

class PersonRow extends React.Component {
    render() {
        const { person, onEditClicked, onDeleteClicked, isChecked, onCheckToggle } = this.props;
        const { FirstName, LastName, Age } = person;
       
                <tr>
                    <td>
                        <div className="d-flex justify-content-center align-items-center">
                            <input checked={isChecked} onChange={onCheckToggle} type="checkbox" className="form-check-input mt-2" />
                        </div>
                    </td>
                    <td>{FirstName}</td>
                    <td>{LastName}</td>
                    <td>{Age}</td>
                    <td>
                        <button onClick={onEditClicked} className="btn btn-warning">Edit</button>
                        <button onClick={onDeleteClicked} className="btn btn-danger">Delete</button>
                    </td>
                </tr>

            
        }

    }

export default PersonRow;