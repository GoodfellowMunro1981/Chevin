import React, { useState, useEffect, useRef } from 'react';
import Page from '../../components/page';
import VehicleService from '../../services/vehicleService';
import { VehicleListItemDtos } from '../../swagger';
import { List, Space, Table } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './index.scss';

type VehicleListPageProps = {}

const VehicleListPage: React.FC<VehicleListPageProps> = props => {

    const [isLoading, setIsLoading] = useState(true);
    const [vehicles, setVehicles] = useState<VehicleListItemDtos[]>([]);

    useEffect(() => {
        loadData();

        renderDisplay();
        window.addEventListener("resize", renderDisplay);
        return () => window.removeEventListener("resize", renderDisplay);
    }, []);

    const loadData = async () => {

        let result = await VehicleService.GetVehicles();

        if (result != null && result.items != null) {
            setVehicles(result.items);
        }
        else {
            setVehicles([]);
        }

        setIsLoading(false);
    }

    const getStatusText = (value: string): string => {

        switch (value) {
            case 'LiveOnFleet':
                return 'Live On Fleet';
            case 'AwaitingDisposal':
                return 'Awaiting Disposal';
            case 'PreFleet':
                return 'Pre-Fleet';
        }

        return value;
    }

    const columns = [
        {
            title: 'Registration Number',
            dataIndex: 'registration',
            key: 'registration',
            render: (text: any, record: any) => <Link to={'/details/' + text}>{text}</Link>,
        },
        {
            title: 'Vehicle Status',
            dataIndex: 'status',
            key: 'status',
            render: (text: any, record: any) => <span className='vehicle-status'>{getStatusText(text)}</span>
        },
        {
            title: 'Vehicle Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Fuel Type',
            dataIndex: 'fuelType',
            key: 'fuelType'
        },
        {
            title: 'Odometer',
            key: 'odometerReading',
            dataIndex: 'odometerReading'
        },
        {
            title: 'Country Code',
            key: 'countryCode',
            dataIndex: 'countryCode'
        }
    ];

    const renderDisplay = () => {
        if (window.outerWidth > 800) {
            return <Table className='vehicle-list-table'
                columns={columns}
                dataSource={vehicles} />
        }

        return <List
            itemLayout="horizontal"
            dataSource={vehicles}
            pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 10,
              }}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        title={<Link to={'/details/' + item.registration}>{item.registration}</Link>}
                        description={item.description}
                    />
                </List.Item>
            )} />
    }

    return <Page>
        {
            isLoading && <div className="loading-container">
                <span>Loading</span>
            </div>
        }
        {
            !isLoading && <div id='vehicle-list'>
                {renderDisplay()}
            </div>
        }
    </Page>
}

export default VehicleListPage;