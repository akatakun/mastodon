import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import PropTypes from 'prop-types';
import React from 'react';
import { ChromePicker } from 'react-color';
import { connect } from 'react-redux';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import {
  changeTrackComposeTrackTitle,
  changeTrackComposeTrackArtist,
  changeTrackComposeTrackText,
  changeTrackComposeTrackMusic,
  changeTrackComposeTrackVideoImage,
  changeTrackComposeTrackVideoBlurVisibility,
  changeTrackComposeTrackVideoBlurParamMovementThreshold,
  changeTrackComposeTrackVideoBlurParamBlinkThreshold,
  changeTrackComposeTrackVideoParticleVisibility,
  changeTrackComposeTrackVideoParticleParamColor,
  changeTrackComposeTrackVideoParticleParamLimitThreshold,
  changeTrackComposeTrackVideoLightLeaksVisibility,
  changeTrackComposeTrackVideoSpectrumVisiblity,
  changeTrackComposeTrackVideoSpectrumParamMode,
  changeTrackComposeTrackVideoSpectrumParamColor,
  submitTrackCompose,
} from '../../actions/track_compose';
import IconButton from '../../components/icon_button';
import Musicvideo from '../../components/musicvideo';
import { convertToRgbObject } from '../../util/musicvideo';

const messages = defineMessages({
  preview: { id: 'track_compose.preview', defaultMessage: 'Video preview' },
});

const mapStateToProps = (state) => ({
  tab: state.getIn(['pawoo_music', 'track_compose', 'tab']),
  track: state.getIn(['pawoo_music', 'track_compose', 'track']),
  isSubmitting: state.getIn(['pawoo_music', 'track_compose', 'is_submitting']),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeTrackTitle (value) {
    dispatch(changeTrackComposeTrackTitle(value));
  },

  onChangeTrackArtist (value) {
    dispatch(changeTrackComposeTrackArtist(value));
  },

  onChangeTrackText (value) {
    dispatch(changeTrackComposeTrackText(value));
  },

  onChangeTrackMusic (value) {
    dispatch(changeTrackComposeTrackMusic(value));
  },

  onChangeTrackVideoImage (value) {
    dispatch(changeTrackComposeTrackVideoImage(value));
  },

  onChangeTrackVideoBlurVisibility (value) {
    dispatch(changeTrackComposeTrackVideoBlurVisibility(value));
  },

  onChangeTrackVideoBlurParamMovementThreshold (value) {
    dispatch(changeTrackComposeTrackVideoBlurParamMovementThreshold(value));
  },

  onChangeTrackVideoBlurParamBlinkThreshold (value) {
    dispatch(changeTrackComposeTrackVideoBlurParamBlinkThreshold(value));
  },

  onChangeTrackVideoParticleVisibility (value) {
    dispatch(changeTrackComposeTrackVideoParticleVisibility(value));
  },

  onChangeTrackVideoParticleParamColor (value) {
    dispatch(changeTrackComposeTrackVideoParticleParamColor(value));
  },

  onChangeTrackVideoParticleParamLimitThreshold (value) {
    dispatch(changeTrackComposeTrackVideoParticleParamLimitThreshold(value));
  },

  onChangeTrackVideoLightLeaksVisibility (value) {
    dispatch(changeTrackComposeTrackVideoLightLeaksVisibility(value));
  },

  onChangeTrackVideoSpectrumVisibility (value) {
    dispatch(changeTrackComposeTrackVideoSpectrumVisiblity(value));
  },

  onChangeTrackVideoSpectrumParamMode (value) {
    dispatch(changeTrackComposeTrackVideoSpectrumParamMode(value));
  },

  onChangeTrackVideoSpectrumParamColor (value) {
    dispatch(changeTrackComposeTrackVideoSpectrumParamColor(value));
  },

  onSubmit () {
    dispatch(submitTrackCompose());
  },
});

@connect(mapStateToProps, mapDispatchToProps)
@injectIntl
export default class TrackCompose extends ImmutablePureComponent {

  static propTypes = {
    onChangeTrackTitle: PropTypes.func.isRequired,
    onChangeTrackArtist: PropTypes.func.isRequired,
    onChangeTrackText: PropTypes.func.isRequired,
    onChangeTrackMusic: PropTypes.func.isRequired,
    onChangeTrackVideoImage: PropTypes.func.isRequired,
    onChangeTrackVideoBlurVisibility: PropTypes.func.isRequired,
    onChangeTrackVideoBlurParamMovementThreshold: PropTypes.func.isRequired,
    onChangeTrackVideoBlurParamBlinkThreshold: PropTypes.func.isRequired,
    onChangeTrackVideoParticleVisibility: PropTypes.func.isRequired,
    onChangeTrackVideoParticleParamColor: PropTypes.func.isRequired,
    onChangeTrackVideoParticleParamLimitThreshold: PropTypes.func.isRequired,
    onChangeTrackVideoLightLeaksVisibility: PropTypes.func.isRequired,
    onChangeTrackVideoSpectrumVisibility: PropTypes.func.isRequired,
    onChangeTrackVideoSpectrumParamMode: PropTypes.func.isRequired,
    onChangeTrackVideoSpectrumParamColor: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    tab: PropTypes.string.isRequired,
    track: ImmutablePropTypes.map.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    intl: PropTypes.object.isRequired,
    onClose: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }

  static defaultProps = {
    onClose: false,
  }

  trackMusicRef = null;
  trackVideoImageRef = null;

  componentWillReceiveProps ({ track }) {
    if (track.get('music') === null && this.props.track.get('music') !== null &&
        this.trackMusicRef !== null) {
      this.trackMusicRef.value = '';
    }

    if (track.getIn(['video', 'image']) === null &&
        this.props.track.getIn(['video', 'image']) !== null &&
        this.trackVideoImageRef !== null) {
      this.trackVideoImageRef.value = '';
    }
  }

  handleChangeTrackMusic = ({ target }) => {
    this.props.onChangeTrackMusic(target.files[0]);
  }

  handleChangeTrackTitle = ({ target }) => {
    this.props.onChangeTrackTitle(target.value);
  }

  handleChangeTrackArtist = ({ target }) => {
    this.props.onChangeTrackArtist(target.value);
  }

  handleChangeTrackText = ({ target }) => {
    this.props.onChangeTrackText(target.value);
  }

  handleChangeTrackVideoImage = ({ target }) => {
    this.props.onChangeTrackVideoImage(target.files[0]);
  }

  handleChangeTrackVideoBlurVisibility = ({ target }) => {
    this.props.onChangeTrackVideoBlurVisibility(target.checked);
  }

  handleChangeTrackBlurParamMovementThreshold = ({ target }) => {
    this.props.onChangeTrackVideoBlurParamMovementThreshold(target.value);
  }

  handleChangeTrackVideoBlurParamBlinkThreshold = ({ target }) => {
    this.props.onChangeTrackVideoBlurParamBlinkThreshold(target.value);
  }

  handleChangeTrackVideoParticleVisibility = ({ target }) => {
    this.props.onChangeTrackVideoParticleVisibility(target.checked);
  }

  handleChangeTrackVideoParticleParamLimitThreshold = ({ target }) => {
    this.props.onChangeTrackVideoParticleParamLimitThreshold(target.value);
  }

  handleChangeTrackVideoParticleParamColor = ({ rgb }) => {
    this.props.onChangeTrackVideoParticleParamColor((rgb.r << 16) | (rgb.g << 8) | rgb.b);
  }

  handleChangeTrackVideoLightLeaksVisibility = ({ target }) => {
    this.props.onChangeTrackVideoLightLeaksVisibility(target.checked);
  }

  handleChangeTrackVideoSpectrumVisibility = ({ target }) => {
    this.props.onChangeTrackVideoSpectrumVisibility(target.checked);
  }

  handleChangeTrackVideoSpectrumParamMode = ({ target }) => {
    if (target.checked) {
      this.props.onChangeTrackVideoSpectrumParamMode(Number(target.value));
    }
  }

  handleChangeTrackVideoSpectrumParamColor = ({ rgb }) => {
    this.props.onChangeTrackVideoSpectrumParamColor((rgb.r << 16) | (rgb.g << 8) | rgb.b);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit();
  }

  handleCancel = (e) => {
    e.preventDefault();
    if (typeof this.props.onClose === 'function') {
      this.props.onClose();
    } else {
      location.href = '/';
    }
  }

  setTrackMusicRef = (ref) => {
    this.trackMusicRef = ref;
  }

  setTrackVideoImageRef = (ref) => {
    this.trackVideoImageRef = ref;
  }

  render () {
    const { track } = this.props;

    return (
      <div className='track-compose'>
        <div className='content'>
          <Musicvideo track={track} label={this.props.intl.formatMessage(messages.preview)} autoPlay={false} />
          <div className='form-content'>
            <form>
              <fieldset>
                <legend>
                  <div className='track-compose-file-upload'>
                    <div className='track-compose-file-upload-body'>
                      <label className='horizontal'>
                        <span className='text'>
                          <IconButton src='music' />
                          <FormattedMessage
                            id='pawoo_music.track_compose.basic.music'
                            defaultMessage='Select audio'
                          />
                        </span>
                        <input
                          accept='audio/mpeg'
                          onChange={this.handleChangeTrackMusic}
                          ref={this.setTrackMusicRef}
                          required
                          type='file'
                        />
                      </label>
                    </div>
                  </div>
                </legend>

                <legend>
                  <div className='track-compose-text-input'>
                    <label className='horizontal'>
                      {this.props.track.get('title').length === 0 && (
                        <span className='text'>
                          <FormattedMessage
                            id='pawoo_music.track_compose.basic.title'
                            defaultMessage='Title'
                          />
                        </span>
                      )}
                      <input
                        maxLength='128'
                        onChange={this.handleChangeTrackTitle}
                        required
                        size='32'
                        type='text'
                        value={this.props.track.get('title')}
                      />
                    </label>
                  </div>
                </legend>

                <legend>
                  <div className='track-compose-text-input'>
                    <label className='horizontal'>
                      {this.props.track.get('artist').length === 0 && (
                        <span className='text'>
                          <FormattedMessage
                            id='pawoo_music.track_compose.basic.artist'
                            defaultMessage='Artist'
                          />
                        </span>
                      )}
                      <input
                        maxLength='128'
                        onChange={this.handleChangeTrackArtist}
                        required
                        size='32'
                        type='text'
                        value={this.props.track.get('artist')}
                      />
                    </label>
                  </div>
                </legend>

                <legend>
                  <div className='track-compose-text-textarea'>
                    <label className='horizontal'>
                      {this.props.track.get('text').length === 0 && (
                        <span className='text'>
                          <FormattedMessage
                            id='pawoo_music.track_compose.basic.details'
                            defaultMessage='Details'
                          />
                        </span>
                      )}
                      <textarea
                        maxLength='500'
                        onChange={this.handleChangeTrackText}
                        value={this.props.track.get('text')}
                      />
                    </label>
                  </div>
                </legend>

                <legend>
                  <div className='track-compose-file-upload'>
                    <div className='track-compose-file-upload-body'>
                      <label className='horizontal'>
                        <span className='text'>
                          <IconButton src='image' />
                          <FormattedMessage
                            id='pawoo_music.track_compose.video.image'
                            defaultMessage='Image'
                          />
                        </span>
                        <input
                          accept='image/jpeg,image/png'
                          onChange={this.handleChangeTrackVideoImage}
                          ref={this.setTrackVideoImageRef}
                          type='file'
                        />
                      </label>
                    </div>
                  </div>
                </legend>
              </fieldset>

              <fieldset>
                <legend>
                  <label className='horizontal'>
                    <input
                      checked={this.props.track.getIn(['video', 'blur', 'visible'])}
                      onChange={this.handleChangeTrackVideoBlurVisibility}
                      type='checkbox'
                    />
                    <FormattedMessage
                      id='pawoo_music.track_compose.video.blur'
                      defaultMessage='Blur'
                    />
                  </label>
                </legend>
                <label className='horizontal'>
                  <span className='text'>
                    <FormattedMessage
                      id='pawoo_music.track_compose.video.movement_threshold'
                      defaultMessage='Threshold triggering movement'
                    />
                  </span>
                  <input
                    min='128'
                    max='256'
                    onChange={this.handleChangeTrackBlurParamMovementThreshold}
                    type='range'
                    value={this.props.track.getIn(['video', 'blur', 'params', 'movement', 'threshold'])}
                  />
                </label>
                <label className='horizontal'>
                  <span className='text'>
                    <FormattedMessage
                      id='pawoo_music.track_compose.video.blink_threshold'
                      defaultMessage='Threshold triggering blink'
                    />
                  </span>
                  <input
                    min='128'
                    max='256'
                    onChange={this.handleChangeTrackVideoBlurParamBlinkThreshold}
                    type='range'
                    value={this.props.track.getIn(['video', 'blur', 'params', 'blink', 'threshold'])}
                  />
                </label>
              </fieldset>

              <fieldset>
                <legend>
                  <label className='horizontal'>
                    <input
                      checked={this.props.track.getIn(['video', 'particle', 'visible'])}
                      onChange={this.handleChangeTrackVideoParticleVisibility}
                      type='checkbox'
                    />
                    <FormattedMessage
                      id='pawoo_music.track_compose.video.particle'
                      defaultMessage='Particle'
                    />
                  </label>
                </legend>
                <label className='horizontal'>
                  <span className='text'>
                    <FormattedMessage
                      id='pawoo_music.track_compose.video.limit_threshold'
                      defaultMessage='Threshold triggering change'
                    />
                  </span>
                  <input
                    min='128'
                    max='256'
                    onChange={this.handleChangeTrackVideoParticleParamLimitThreshold}
                    type='range'
                    value={this.props.track.getIn(['video', 'particle', 'params', 'limit', 'threshold'])}
                  />
                </label>
                <ChromePicker
                  color={convertToRgbObject(this.props.track.getIn(['video', 'particle', 'params', 'color']))}
                  disableAlpha
                  onChange={this.handleChangeTrackVideoParticleParamColor}
                />
              </fieldset>

              <label className='horizontal'>
                <input
                  checked={this.props.track.getIn(['video', 'lightleaks', 'visible'])}
                  onChange={this.handleChangeTrackVideoLightLeaksVisibility}
                  type='checkbox'
                />
                <FormattedMessage
                  id='pawoo_music.track_compose.video.lightleaks'
                  defaultMessage='Light leaks'
                />
              </label>

              <fieldset>
                <legend>
                  <label className='horizontal'>
                    <input
                      checked={this.props.track.getIn(['video', 'spectrum', 'visible'])}
                      onChange={this.handleChangeTrackVideoSpectrumVisibility}
                      type='checkbox'
                    />
                    <FormattedMessage
                      id='pawoo_music.track_compose.video.spectrum'
                      defaultMessage='Spectrum'
                    />
                  </label>
                </legend>
                <label>
                  <input
                    checked={this.props.track.getIn(['video', 'spectrum', 'params', 'mode']) === 0}
                    name='video-spectrum-mode'
                    onClick={this.handleChangeTrackVideoSpectrumParamMode}
                    type='radio'
                    value='0'
                  />
                  <FormattedMessage
                    id='pawoo_music.track_compose.video.bottom_columns'
                    defaultMessage='Columns at the bottom'
                  />
                </label>
                <label>
                  <input
                    checked={this.props.track.getIn(['video', 'spectrum', 'params', 'mode']) === 1}
                    name='video-spectrum-mode'
                    onChange={this.handleChangeTrackVideoSpectrumParamMode}
                    type='radio'
                    value='1'
                  />
                  <FormattedMessage
                    id='pawoo_music.track_compose.video.circle_columns'
                    defaultMessage='Columns around circle'
                  />
                </label>
                <label>
                  <input
                    checked={this.props.track.getIn(['video', 'spectrum', 'params', 'mode']) === 2}
                    name='video-spectrum-mode'
                    onChange={this.handleChangeTrackVideoSpectrumParamMode}
                    type='radio'
                    value='2'
                  />
                  <FormattedMessage
                    id='pawoo_music.track_compose.video.circle'
                    defaultMessage='Circle'
                  />
                </label>
                <label>
                  <input
                    checked={this.props.track.getIn(['video', 'spectrum', 'params', 'mode']) === 3}
                    name='video-spectrum-mode'
                    onChange={this.handleChangeTrackVideoSpectrumParamMode}
                    type='radio'
                    value='3'
                  />
                  <FormattedMessage
                    id='pawoo_music.track_compose.video.bottom_fill'
                    defaultMessage='Filled graph at the bottom'
                  />
                </label>
              </fieldset>

              <ChromePicker
                color={convertToRgbObject(this.props.track.getIn(['video', 'spectrum', 'params', 'color']))}
                disableAlpha
                onChange={this.handleChangeTrackVideoSpectrumParamColor}
              />
            </form>
          </div>
        </div>

        <div className='actions'>
          <button className='cancel' onClick={this.handleCancel}>
            <FormattedMessage id='column_back_button.label' defaultMessage='Back' />
          </button>
          <button className='submit' disabled={this.props.isSubmitting} onClick={this.handleSubmit}>
            <FormattedMessage id='pawoo_music.track_compose.save' defaultMessage='Save' />
          </button>
        </div>
      </div>
    );
  }

}
