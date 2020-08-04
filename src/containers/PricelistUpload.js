import { connect } from 'react-redux';
import Upload from '../components/Upload';
import { selectUploadFile, uploadFile } from '../actions';

/**
 * PriceListUpload Container:
 * Handles Upload Component
 */

const mapStateToProps = state => {
  return {
    fileToUpload: state.upload.fileToUpload,
    inProgress: state.upload.inProgress,
    result: state.upload.result
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectUploadFile(e) {
      dispatch(selectUploadFile(e.target.files[0]));
    },
    submitFile(file) {
      dispatch(uploadFile(file));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
