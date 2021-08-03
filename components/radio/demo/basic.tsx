import React from 'react'
import { ScrollView } from 'react-native'
import { Button, List, Radio } from '../../'

export default class BasicRadioExample extends React.Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context)
    this.state = {
      disabled: false,
    }
  }

  toggleDisabled = () => {
    this.setState({
      disabled: !this.state.disabled,
    })
  }

  render() {
    return (
      <ScrollView>
        <List renderHeader="基本用法">
          <List.Item thumb={<Radio>Radio</Radio>} />
        </List>
        <List
          renderHeader="不可用"
          renderFooter={
            <Button type="primary" onPress={this.toggleDisabled}>
              Toggle disabled
            </Button>
          }>
          <List.Item
            thumb={
              <Radio defaultChecked={false} disabled={this.state.disabled} />
            }
          />
          <List.Item
            thumb={<Radio defaultChecked disabled={this.state.disabled} />}
          />
        </List>
      </ScrollView>
    )
  }
}
