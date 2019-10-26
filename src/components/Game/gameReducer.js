const initialState = {
  propagandaData: [],
  selectedTags: [],
  additionalTagList: [],
  isLoading: false,
  currentIndex: 0,
}

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_PROPAGANDA": {
      const { shouldShowLoader } = action.payload

      return { ...state, isLoading: shouldShowLoader }
    }

    case "FETCH_PROPAGANDA_SUCCESS": {
      return {
        ...state,
        isLoading: false,
        propagandaData: [...state.propagandaData, ...action.payload],
      }
    }

    case "FETCH_PROPAGANDA_FAILED": {
      throw new Error("FETCH_PROPAGANDA_FAILED")
    }

    case "NEXT_PROPAGANDA": {
      return {
        ...state,
        selectedTags: [],
        additionalTagList: [],
        currentIndex: state.currentIndex + 1,
        isImgLoading: true,
      }
    }

    case "UPDATE_TAG_SELECTION": {
      const { id } = action.payload
      const { selectedTags } = state
      const isTagAlreadySelected = !!selectedTags[id]
      const newSelectedTags = { ...selectedTags }

      if (isTagAlreadySelected) {
        newSelectedTags[id] = false
      } else {
        newSelectedTags[id] = true
      }

      return { ...state, selectedTags: newSelectedTags }
    }

    case "ADD_CUSTOM_TAG": {
      const { additionalTagList } = action.payload

      return {
        ...state,
        additionalTagList,
      }
    }

    case "REMOVE_CUSTOM_TAG": {
      const { additionalTagList } = state
      const { tag } = action.payload
      const newTagList = additionalTagList.filter(item => item.name !== tag)

      return {
        ...state,
        additionalTagList: newTagList,
      }
    }

    case "IMAGE_ON_LOAD": {
      return {
        ...state,
        isImgLoading: false,
      }
    }

    default:
      throw new Error()
  }
}

export { initialState, reducer }
