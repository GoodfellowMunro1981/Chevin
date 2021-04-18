import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import Page from '../../components/page';
import VehicleService from '../../services/vehicleService';
import { VehicleDetailsDtos } from '../../swagger';
import { format } from 'date-fns';
import 'antd/dist/antd.css';
import './index.scss';

// is this needed?
import * as url from "url";
url.URLSearchParams = URLSearchParams;

type VehicleDetailsPageProps = {} & RouteComponentProps

const VehicleDetailsPage: React.FC<VehicleDetailsPageProps> = props => {

    let { id }: any = useParams();

    let registration: string = (id != null && id != undefined)
        ? id
        : '';

    let defaultVehicleDetails: VehicleDetailsDtos = {};

    const [isLoading, setIsLoading] = useState(true);
    const [vehicle, setVehicle] = useState<VehicleDetailsDtos>(defaultVehicleDetails);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        let result = await VehicleService.GetVehicleDetails(registration);

        if (result != null && result.vehicleDetails != null) {
            setVehicle(result.vehicleDetails);
        }
        else {
            setVehicle(defaultVehicleDetails);
        }

        setIsLoading(false);
    }

    const getDateString = (value: Date | undefined) => {

        if (value != undefined) {
            return format(new Date(value), "dd-MM-yyyy");
        }

        return '';
    }


    return <Page>
        {
            isLoading && <div className="loading-container">
                <span>Loading</span>
            </div>
        }
        {
            !isLoading && <div id='vehicle-details' className='layout-body'>
                <h1>{vehicle.registration}</h1>
                <div className='vehicle-description'>
                    <div className='vehicle-description-container'>
                        <div className='row'>
                            <div className='column'>
                                <div className="column-item">
                                    <div className="bold-txt">Vehicle Description</div>
                                </div>
                                <div className='column-item'>
                                    <span className='vehicle-status'>{vehicle.status}</span>
                                </div>
                            </div>
                            <div className='column'>
                                <div className="column-item">
                                    <span className='bold-txt'>Make Code</span>
                                    <br />
                                    <span>{vehicle.makeCode}</span>
                                </div>
                                <div className="column-item">
                                    <b>Model Code</b>
                                    <br />
                                    <span>{vehicle.modelCode}</span>
                                </div>
                            </div>
                            <div className='column'>
                                <div className="column-item">
                                    <span className='bold-txt'>Body Type</span>
                                    <br />
                                    <span>{vehicle.bodyType}</span>
                                </div>
                                <div className="column-item">
                                    <b>On Fleet Date</b>
                                    <br />
                                    <span>{getDateString(vehicle.onFleetDate)}</span>
                                </div>
                            </div>
                            <div className='column'>
                                <div className="column-item">
                                    <b>Country Code</b>
                                    <br />
                                    <span>{vehicle.countryCode}</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='vehicle-description-container'>
                        <h2>Fuel</h2>
                        <div className='row'>
                            <div className='column'>
                                <div className="column-item">
                                    <span className='bold-txt'>Fuel Type</span>
                                    <br />
                                    <span>{vehicle.fuelType}</span>
                                </div>
                                <div className='column-item'>
                                    <span className='bold-txt'>MPG (UK)</span>
                                    <br />
                                    <span>{vehicle.mpg}</span>
                                </div>
                            </div>
                            <div className='column'>
                                <div className="column-item">
                                    <span className='bold-txt'>Cost per Mile</span>
                                    <br />
                                    <span>{vehicle.costPerMile}</span>
                                </div>
                                <div className='column-item'>
                                    <span className='bold-txt'>Cost per KM</span>
                                    <br />
                                    <span>{vehicle.costPerKM}</span>
                                </div>
                            </div>
                            <div className='column'>
                                <div className="column-item">
                                    <span className='bold-txt'>Odometer</span>
                                    <br />
                                    <span>{vehicle.odometerReading}</span>
                                </div>
                                <div className='column-item'>
                                    <span className='bold-txt'>Odometer Type</span>
                                    <br />
                                    <span>{vehicle.odometerType}</span>
                                </div>
                            </div>
                            <div className='column'>
                                <div className="column-item">
                                    <span className='bold-txt'>Odometer Date</span>
                                    <br />
                                    <span>{getDateString(vehicle.odometerDate)}</span>
                                </div>
                                <div className='column-item'>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='vehicle-description-container'>
                        <h2>Compliance</h2>
                        <div className='row'>
                            <div className='column'>
                                <div className="column-item">
                                    <span className='bold-txt'>MOT Date</span>
                                    <br />
                                    <span>{getDateString(vehicle.motDueDate)}</span>
                                </div>
                                <div className='column-item'>
                                    <span className='bold-txt'>Insurance Due Date</span>
                                    <br />
                                    <span>{getDateString(vehicle.insuranceDueDate)}</span>
                                </div>
                            </div>
                            <div className='column'>
                                <div className="column-item">
                                    <span className='bold-txt'>Tax Due Date</span>
                                    <br />
                                    <span>{getDateString(vehicle.taxDueDate)}</span>
                                </div>
                                <div className='column-item'>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='vehicle-description-container'>
                        <h2>Procurment</h2>
                        <div className='row'>
                            <div className='column'>
                                <div className="column-item">
                                    <span className='bold-txt'>Date Purchased</span>
                                    <br />
                                    <span>{getDateString(vehicle.datePurchased)}</span>
                                </div>
                                <div className='column-item'>
                                    <span className='bold-txt'>Date Registered</span>
                                    <br />
                                    <span>{getDateString(vehicle.dateRegistered)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </Page>
}

export default VehicleDetailsPage;