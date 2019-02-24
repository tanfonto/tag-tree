import store from '../store'

test('store.model.active should have initial state equal to null', () => {
    const initialState = store.model.active()
    expect(initialState).toBeNull()
})

test('store.model.nodes should have initial state equal to empty array', () => {
    const initialState = store.model.nodes()
    expect(initialState).toEqual([])
})

test('store.views.addNode should have initial state set to hidden and non-submittable', () => {
    const initialState = store.views.addNode()
    expect(initialState).toEqual({ visible: false, submitHidden: true })
})

test('store.model.active.set sets node to nod e provided', () => {
    const expected = { attrs: { value: 42 } }
    store.model.active.set(expected)
    const actual = store.model.active()
    expect(actual).toEqual(expected)
})

test('store.model.nodes.append appends item provided to the node list', () => {
    const node = { attrs: { value: 42 } }
    const nodesBefore = store.model.nodes()

    store.model.nodes.append(node)
    const nodesAfter = store.model.nodes()
    expect(nodesAfter).toEqual([ node, ...nodesBefore ])
})

test('store.model.addNode.toggle swaps the visible state of addNode view', () => {
    const stateBefore = store.views.addNode()
    expect(stateBefore.visible).toBeFalsy()
    store.views.addNode.toggle()
    const stateAfter = store.views.addNode()
    expect(stateAfter.visible).toBeTruthy()
})

test('store.model.addNode.hideSubmit sets the "hidden" property of "submit" button state to value provided', () => {
    const stateBefore = store.views.addNode()
    expect(stateBefore.submitHidden).toBeTruthy()
    store.views.addNode.hideSubmit(false)
    const stateAfter = store.views.addNode()
    expect(stateAfter.submitHidden).toBeFalsy()
})
