import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import { toast } from 'react-toastify';
import './FormDetails.css';

import { useParams } from 'react-router-dom';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 2.2 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

const FormDetails = () => {
    const params = useParams();
    const [inputName, setInputName] = React.useState('');
    const [term, setTerm] = React.useState(false);
    const [selectedSector, setSelectedSector] = React.useState(null);
    const [sectors, setSectors] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const getData = React.useCallback(async () => {
        setLoading(true);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.get(`http://localhost:8000/api/selectbox-list/`, config)
            .then(res => {
                console.log(res.data.data);
                setSectors(res.data.data);

            })
            .catch(err => {
                console.log(err, 'in fetch');
            });


        axios.get(`http://localhost:8000/api/form-detail-view/${params.id}/`, config)
            .then(res => {

                setLoading(false);
                setInputName(res.data.data.name);
                setTerm(true);
                setSelectedSector(res.data.data.sector.value);

                console.log(res);

            }).catch(err => {
                setLoading(false);
                toast.error(err.response.data.message);
                console.log(err);
            });

    }, []);
    React.useEffect(() => {
        getData();
    }, [getData]);

    const handleChange = (event) => {
        setSelectedSector(event.target.value);
    };
    const handleTerm = () => {
        setTerm((prev) => !prev);
        console.log(term);
    };
    const handleSubmit = (e) => {
        setLoading(true);

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({ 'name': inputName, 'sectorVal': selectedSector });
        axios.put(`http://localhost:8000/api/form-detail-view/${params.id}/`, body, config)
            .then(res => {

                setLoading(false);
                toast.success(res.data.message);
                console.log(res);

            }).catch(err => {
                setLoading(false);
                toast.error(err.response.data.message);
                console.log(err);
            });
    };

    console.log(selectedSector, inputName, term);
    return (
        <>
            {
                loading ? <HashLoader speedMultiplier={1.5} color={'white'} style={{ marginLeft: "50%" }
                } size={100} /> :
                    <>
                        <div class="container" >
                            <h2>Please enter your name and pick the Sectors you are currently involved in.</h2>
                            <br />
                            <br />
                            <div>
                                <div class="row">
                                    <h4>Name</h4>
                                    <div class="input-group input-group-icon">
                                        <input type="text" placeholder="Full Name" value={inputName} onChange={(e) => { setInputName(e.target.value); }} />
                                        <div class="input-icon"><i class="fa fa-user"></i></div>
                                    </div>
                                </div>
                                {sectors &&
                                    <div className="row">
                                        <h4>Sectors</h4>

                                        <FormControl fullWidth>

                                            <Select
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                value={selectedSector}
                                                sx={{ marginBottom: 2, }}
                                                onChange={handleChange}
                                                MenuProps={MenuProps}
                                            >
                                                {sectors.map((val, i) => <MenuItem value={val.value}>{val.name}</MenuItem>)}

                                            </Select>
                                        </FormControl>
                                    </div>}
                                <div class="row">
                                    <h4>Terms and Conditions</h4>
                                    <div class="input-group">
                                        <input id="terms" type="checkbox" checked={term} onClick={handleTerm} />
                                        <label for="terms">I accept the terms and conditions for signing up to this service, and hereby confirm I have read the privacy policy.</label>
                                    </div>
                                </div>
                                <div className="row" style={{ textAlign: 'center' }}>
                                    <button class="button-6" disabled={selectedSector === null || inputName.length === 0 || term === false} onClick={(e) => handleSubmit(e)} >Update</button>
                                </div>

                            </div>
                        </div >
                    </>

            }
        </>
    );
};

export default FormDetails;;