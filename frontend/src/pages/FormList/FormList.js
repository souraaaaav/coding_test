import axios from 'axios';
import React from 'react';
import { useNavigate } from "react-router-dom";
import HashLoader from 'react-spinners/HashLoader';
import './FormList.css';
const FormList = () => {
    const navigate = useNavigate();
    const [sectors, setSectors] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const getData = React.useCallback(async () => {
        setLoading(true);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.get(`http://localhost:8000/api/form-list-view/`, config)
            .then(res => {
                console.log(res.data.data);
                setSectors(res.data.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err, 'in fetch');
                setLoading(false);
            });

    }, []);
    React.useEffect(() => {
        getData();
    }, [getData]);

    const routeToEdit = (e, ind) => {
        navigate('/' + ind + '/form-detail');
    };
    return (
        <>
            {
                loading ? <HashLoader speedMultiplier={1.5} color={'white'} style={{ marginLeft: "50%" }
                } size={100} /> :
                    <div div className='list-container' >
                        <h2>Form List of the User </h2>
                        <ul class="responsive-table">
                            <li class="table-header">
                                <div class="col col-1">User Name</div>
                                <div class="col col-2">Sector</div>
                                <div class="col col-3">Action</div>

                            </li>
                            {sectors &&
                                sectors.map((val, ind) => (
                                    <li class="table-row">
                                        <div class="col col-1" data-label="Job Id">{val.name}</div>
                                        <div class="col col-2" data-label="Customer Name">{val.sector.name}</div>
                                        <div class="col col-3" data-label="Customer Name"><i class="fa fa-pencil-square-o edit-icon" aria-hidden="true" onClick={(e) => { routeToEdit(e, val.id); }}></i></div>
                                    </li>
                                ))
                            }

                        </ul>
                    </div >
            }
        </>
    );
};

export default FormList;