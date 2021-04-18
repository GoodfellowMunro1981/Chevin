import { Modal, ModalFuncProps } from "antd";

export type UserException = {
    error: {
        code: number | null,
        message: string
    }
}

const showUserException = async (response: Response) => {
    let body: UserException = await response.json();

    let props: ModalFuncProps = {
        title: 'An error has occured',
        content: body.error.message,
        zIndex: 2000
    };

    Modal.error(props);
}

export {
    showUserException
};