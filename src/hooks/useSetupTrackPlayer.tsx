import { useEffect, useRef } from 'react'
import TrackPlayer, { Capability, RepeatMode } from 'react-native-track-player'

const setupPlayer = async () => {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	TrackPlayer.registerPlaybackService(() => require('@/helpers/service'))
	await TrackPlayer.setupPlayer({
		maxCacheSize: 1024 * 10, // Helps avoid buffering between track playing
	})

	await TrackPlayer.updateOptions({
		capabilities: [
			Capability.Play,
			Capability.Pause,
			Capability.SkipToNext,
			Capability.SkipToPrevious,
			Capability.Stop,
		],
	})

	await TrackPlayer.setVolume(0.5) // between 0 & 1
	await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}

export const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
	const isInitialized = useRef(false)

	useEffect(() => {
		setupPlayer()
			.then(() => {
				isInitialized.current = true
				onLoad?.()
			})
			.catch((error) => {
				isInitialized.current = false
				console.error(error)
			})
	}, [onLoad])
}
