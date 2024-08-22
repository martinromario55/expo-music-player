import library from '@/assets/data/library.json'
import TracksList from '@/components/TracksList'
import { screenPadding } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import React, { useMemo } from 'react'
import { View } from 'react-native'

const SongScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in songs',
		},
	})

	const filteredTracks = useMemo(() => {
		if (!search) return library

		return library.filter(trackTitleFilter(search))
	}, [search])

	return (
		<View style={defaultStyles.container}>
			<View style={{ paddingHorizontal: screenPadding.horizontal }}>
				<TracksList tracks={filteredTracks} scrollEnabled={false} />
			</View>
		</View>
	)
}

export default SongScreen
