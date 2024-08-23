import { Event, useTrackPlayerEvents } from 'react-native-track-player'

const events = [Event.PlaybackState, Event.PlaybackError, Event.PlaybackActiveTrackChanged]

export const useLogTrackPlayerState = () => {
	useTrackPlayerEvents(events, async (event) => {
		if (event.type === Event.PlaybackError) {
			console.warn('An error occurred', event)
		}

		if (event.type === Event.PlaybackState) {
			console.log('Playback state changed to', event.state)
		}

		if (event.type === Event.PlaybackActiveTrackChanged) {
			console.log('Active track changed to', event.index)
		}
	})
}
