import React from 'react';

class AddPerson extends React.Component {
    render() {
        const { FirstName, LastName, Age, onTextChange, isEdit, onAddClicked, onEditClicked, onCancelClick } = this.props;
        return (
            <>
                < div className="container" >
                    <div className="row">
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="First Name" value={FirstName} name="FirstName" onChange={onTextChange} />
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="Last Name" value={LastName} name="LastName" onChange={onTextChange} />
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="Age" value={Age} name="Age" onChange={onTextChange} />
                        </div>

                        <div className="col-md-3">
                            {!isEdit &&
                                <button onClick={onAddClicked} className="btn btn-primary w-100">Add</button>
                            }
                            {!!isEdit &&
                                <div>
                                    <button onClick={onCancelClick} className="btn btn-dark w-100">Cancel</button>
                                    <button onClick={onEditClicked} className="btn btn-warning w-100">Update</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <br/>
            </>
        )
    }
}


export default AddPerson;