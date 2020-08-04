import React from 'react';
import dateFormat from 'dateformat';
import log_arrow from '../images/log_arrow.png';
import log_error from '../images/log_error.png';
import log_check from '../images/log_check.png';
import { css } from 'glamor';

/**
 * Upload Component:
 * This is the upload page
 * Contains Upload form, log, upload page title and watermarks.
 */

let cmpStyles = css({
  ' .upload-container': {
    margin: '1rem 3rem'
  },
  ' .upload-button': {
    minHeight: '32px',
    minWidth: '78px',
    ' .slds-spinner': {
      ':before,:after': {
        background: '#6d6d6d !important'
      },
      ' div:before, div:after': {
        background: '#6d6d6d !important'
      }
    }
  },
  ' .page-title': {
    '@media(max-width: 767px)': {
      marginTop: '0'
    }
  },
  ' .watermark-top': {
    position: 'absolute',
    top: '56px',
    right: '0',
    minWidth: '130px'
  },
  ' .slds-notify_toast': {
    position: 'absolute',
    top: '0',
    right: '0'
  },
  ' .log-spinner': {
    position: 'relative',
    left: '38px',
    top: '10px'
  },
  ' .bottom-spinner': {
    height: '25px',
    marginTop: '5px'
  },
  ' .upload-log': {
    maxHeight: '350px',
    overflowY: 'auto',
    borderTop: '1px solid #dedbda',
    paddingTop: '1rem',
    marginTop: '1rem',
    textAlign: 'left',
    ' .finished-item': {
      paddingBottom: '0',
      ':before': {
        width: '0'
      },
      ' .success': {
        backgroundColor: '#e0ffe7',
        ':hover': {
          backgroundColor: '#c4ffd1'
        }
      },
      ' .error': {
        backgroundColor: '#ffe4e2',
        ':hover': {
          backgroundColor: '#f5cbc8'
        }
      }
    },
    ' .slds-timeline__item_error:before': {
      backgroundColor: '#ef6e64'
    },
    ' .log-item-icon': {
      width: '25px',
      float: 'left',
      padding: '3px',
      color: 'gray'
    },
    ' .log-icon': {
      padding: '2px'
    }
  }
});
let submitDate;
let logSize = 0;
let newLogSize = 0;

/**
 * Upload submit button action and stores the submit date
 * for the first item of the log: Uploading file
 */

const uploadFile = (file, submitFile) => {
  if (file) {
    submitDate = new Date();
    submitFile(file);
  } else {
    alert('Please, select a file.');
  }
};

/**
 * Draws an item in the Upload log
 */

const getLogItem = item => (
  <li key={`${item.date}_${item.message}`}>
    <div
      className={`slds-timeline__item_expandable
      ${item.finished ? 'finished-item' : ''}
      ${
        item.date
          ? item.error
            ? 'slds-timeline__item_error'
            : 'slds-timeline__item_task'
          : 'slds-timeline__item_call'
      }`}
    >
      <div className="slds-media">
        <div className="slds-media__figure">
          <div className="log-item-icon" title="Log item">
            <img
              alt="Log item"
              src={log_arrow}
              className="slds-button__icon"
            />
            <span className="slds-assistive-text">Log item</span>
          </div>
          <div
            className={`slds-icon_container slds-timeline__icon
            ${
              item.error
                ? 'slds-icon-standard-dashboard'
                : 'slds-icon-standard-task'
            }`}
          >
            <img
              alt="Log item"
              src={item.error ? log_error : log_check}
              className="slds-icon slds-icon_small log-icon"
            />
          </div>
        </div>
        <div className="slds-media__body">
          <div
            className={`slds-grid slds-grid_align-spread slds-timeline__trigger
            ${item.error ? 'error' : 'success'}`}
          >
            <div className="slds-grid slds-grid_vertical-align-center slds-truncate_container_75 slds-no-space">
              <h3>
                <strong>{item.message}</strong>
              </h3>
            </div>
            <div className="slds-timeline__actions slds-timeline__actions_inline">
              <p className="slds-timeline__date">
                {item.date &&
                  dateFormat(item.date, 'h:MM:ss.l TT | yyyy-mm-dd')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
);

/**
 * UploadLog component:
 * Shows the process of the upload and adds additional custom log that doesn't
 * comes from the backend like: Uploading file, File uploaded and the result
 * of the operation.
 */

const getUploadLog = (result = {}, inProgress) => {
  let log = result.log ? result.log : [];
  newLogSize = log.length; // Needed for knowing when to scroll to bottom
  if(result.success === false){
    log.push({
      error: true,
      message: result.message,
      date: submitDate
    });
  }
  return (log.length || inProgress) && (
    <div className="upload-log">
      <ul className="slds-timeline">
        {getLogItem({
          error: false,
          message: 'Uploading file',
          date: submitDate
        })}
        {Boolean(log.length) && result.success !== false &&
          getLogItem({
            error: false,
            message: 'File uploaded',
            date: log[0].date
          })}
        {log.map(item => getLogItem(item))}
        {Boolean(log.length) &&
          !inProgress &&
          (log[log.length - 1].error
            ? getLogItem({
                error: true,
                finished: !inProgress,
                date: log[log.length - 1].date,
                message:
                  "The file couldn't be processed."
              })
            : getLogItem({
                error: false,
                finished: !inProgress,
                date: log[log.length - 1].date,
                message: (
                  <span>
                    File processed successfully!{' '}
                    <a href="/">Go to the price list</a>
                  </span>
                )
              }))}
        <li ref="logBottom">
          <div className={`bottom-spinner ${inProgress ? '' : 'hidden'}`}>
            <div
              role="status"
              className={`slds-spinner slds-spinner_x-small log-spinner`}
            >
              <span className="slds-assistive-text">Loading</span>
              <div className="slds-spinner__dot-a" />
              <div className="slds-spinner__dot-b" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

/**
 * Upload main component
 */

class Upload extends React.Component {
  componentDidUpdate() {
    // Scrolls to bottom when needed (log updated)
    if (newLogSize !== logSize && this.refs.logBottom) {
      this.refs.logBottom.scrollIntoView({ behavior: 'smooth' });
      logSize = newLogSize;
    }
  }

  render() {
    const {
      fileToUpload,
      inProgress,
      result,
      selectUploadFile,
      submitFile
    } = this.props;
    return (
      <div {...cmpStyles}>
        <div
          className="slds-m-vertical_medium page-title slds-p-left_xx-large slds-p-top_medium"
        >
          <div className={`slds-m-horizontal_xx-large slds-show_medium`}>
            <span
              className={`slds-text-heading_large responsive slds-text-color_inverse`}
            >
              World Wide Price List (Beta)
            </span>
            <span
              className={`slds-text-color_inverse slds-text-heading_large
              responsive slds-float_right slds-m-right_small opacity-6`}
            >
              INTERNAL USE ONLY
            </span>
          </div>
          <div className={`slds-m-horitozontal_medium slds-hide_medium`}>
            <span
              className={`slds-text-heading_medium slds-text-color_default bold`}
            >
              World Wide Price List (Beta)
            </span>
            <span
              className={`slds-text-color_inverse slds-text-heading_x-small
              slds-float_right slds-m-right_small opacity-6 watermark-top`}
            >
              INTERNAL USE ONLY
            </span>
          </div>
        </div>
        <div className="upload-container">
          <header className="slds-modal__header">
            <h2
              id="modal-heading-01"
              className="slds-text-heading_medium slds-hyphenate"
            >
              Upload Price List
            </h2>
          </header>
          <div
            className="slds-modal__content slds-p-around_medium center"
            id="modal-content-id-1"
          >
            <input
              id="uploadFile"
              type="file"
              onChange={selectUploadFile}
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
            {getUploadLog(result, inProgress)}
          </div>
          <footer className="slds-modal__footer">
            <button
              className="slds-button slds-button_brand upload-button"
              disabled={inProgress || !fileToUpload}
              onClick={e => uploadFile(fileToUpload, submitFile)}
            >
              Upload
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

export default Upload;
