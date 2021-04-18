import React from 'react';
import './index.scss';

type PageProps = {

}

const Page: React.FC<PageProps> = props => {

    return <div className={'content'}>
        {props.children}
    </div>
}

export default Page;