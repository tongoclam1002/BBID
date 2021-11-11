
import { Button } from "antd";
import { useHistory, useLocation } from "react-router-dom"

export default function ServerError() {
    const history = useHistory();
    const { state } = useLocation<any>();
    return (
        <div>
            {state?.error ? (
                <>
                    {
                        state.error.error || 'Internal server error'
                    }
                </>) : <div>Server Error</div>}
                <Button onClick={() => history.push('/')}>Go back</Button>
        </div>
    )
}