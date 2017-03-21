import { PropTypes } from 'react';

export default PropTypes.shape({
    alert: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
    success: PropTypes.func.isRequired,
    warn: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired,
    info: PropTypes.func.isRequired
});
