import BaseFormSetting from './base-form'
import utils from '@/utils/common'

let formSetting = {
}
let keys = Object.keys(BaseFormSetting)
keys.forEach(v => {
  if (typeof formSetting[v] === 'undefined') {
    formSetting[v] = BaseFormSetting[v]
  }
  utils.deepMerge(BaseFormSetting, formSetting)
})
export default formSetting
