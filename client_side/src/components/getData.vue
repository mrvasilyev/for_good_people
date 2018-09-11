<template>
      <div class="uk-section" uk-height-viewport="offset-top: true">
        <div class="uk-child-width-1-2@m uk-grid-small uk-grid-match uk-text-small" uk-grid>
          <div class="uk-width-1-1@m">
             <div class="uk-card uk-card-body uk-text-left uk-placeholder">
              <form @submit.prevent="checkDadata(result)">
                <fieldset class="uk-fieldset">
                    <legend class="uk-legend uk-text-lead uk-text-small uk-text-bold uk-text-center">Заполните поля формы</legend>
                    <div class="uk-margin">
                        <input class="uk-input" type="text" placeholder="Фамилия, имя и отчество" v-model.lazy="result.fio">
                    </div>
                   <div class="uk-margin">
                     <div uk-grid class="uk-child-width-1-1@m uk-grid-small uk-grid-match uk-text-small">
                       <div uk-form-custom="target: true">
                            <input type="file" disabled>
                            <input class="uk-input" type="text" placeholder="Выберите фотографию" disabled>
                        </div>
                     </div>
                    </div>
                    <div class="uk-margin">
                        <vuesuggestions :model.sync="result.sourceAddr" :options="suggestionOptions" class="uk-input" type="text" placeholder="Адрес места проживания">
                        </vuesuggestions>
                    </div>
                    <div class="uk-margin">
                        <input class="uk-input" type="text" placeholder="Телефон" v-model.lazy="result.sourcePhone">
                    </div>
                    <div class="uk-margin">
                        <input class="uk-input" type="text" placeholder="Серия и номер паспорта" v-model.lazy="result.sourcePassport">
                    </div>
                    <div class="uk-margin">
                        <input class="uk-input" type="text" placeholder="ИНН Физического Лица (ИННФЛ)" v-model.lazy="result.INN" disabled>
                    </div>
                    <div>
                      <button class="uk-button uk-button-secondary uk-width-1-1">Проверить</button>
                    </div>
                </fieldset>
              </form>
             </div>
          </div>
          <div class="uk-width-expand@m">
          <div class="uk-child-width-1-1@m uk-grid-small uk-grid-match uk-text-small" uk-grid>
              <div>
                  <div class="uk-card uk-card-body uk-text-left uk-placeholder">
                    <div class="uk-width-auto">
                        <div>
                            <img class="uk-border-circle" src="../../images/avatar.png" width="60" height="60">
                            <span class="uk-text-middle uk-text-lead uk-padding">{{ people.result }}</span>
                        </div>
                    </div>
                    <ul class="uk-list">
                      <li><span class="uk-text-bold">Фамилия: </span>{{ people.surname }}</li>
                      <li><span class="uk-text-bold">Имя: </span>{{ people.name }}</li>
                      <li><span class="uk-text-bold">Отчество: </span>{{ people.patronymic }}</li>
                      <li v-if="people.gender === 'М'"><span class="uk-text-bold">Пол: </span>Мужской</li>
                      <li v-else-if="people.gender === 'Ж'"><span class="uk-text-bold">Пол: </span>Женский</li>
                      <li v-else><span></span></li>
                      <li v-if="people.qc === 1">
                        <span class="uk-text-danger uk-text-bold ">Требуется ручная проверка записи</span>
                      </li>
                      <li class="uk-text-muted">Кого?: {{ people.result_genitive }}</li>
                      <li class="uk-text-muted">Кому?: {{ people.result_dative }}</li>
                      <li class="uk-text-muted">Кем?: {{ people.result_ablative }}</li>
                    </ul>
                    <!-- <span uk-icon="icon: credit-card; ratio: 1" class="uk-text-primary"></span> -->
                    <ul class="uk-list">
                      <li><span class="uk-text-bold">Серия: </span>{{ passport.series }}</li>
                      <li><span class="uk-text-bold">Номер: </span>{{ passport.number }}</li>
                      <li>
                        <span class="uk-text-bold">Статус документа: </span>
                        <span v-if="passport.qc === 10" class="uk-text-danger uk-text-bold">Недействительный паспорт</span>
                        <span v-if="passport.qc === 0">Действительный паспорт</span>
                      </li>
                      <li v-if="passport.qc === 1"><span class="uk-text-danger uk-text-bold">Требуется ручная проверка записи</span></li>
                    </ul>
                    <!-- <span uk-icon="icon: phone; ratio: 1" class="uk-text-primary"></span> -->
                    <ul class="uk-list">
                      <li><span class="uk-text-bold">Номер телефона: </span>{{ phone.phone }}</li>
                      <li><span class="uk-text-bold">Тип: </span>{{ phone.type }}</li>
                      <li><span class="uk-text-bold">Оператор: </span>{{ phone.provider }}</li>
                      <li v-if="phone.qc === 1 || phone.qc === 3"><span class="uk-text-danger uk-text-bold">Требуется ручная проверка записи</span></li>
                    </ul>
                    <!-- <span uk-icon="icon: home; ratio: 1" class="uk-text-primary"></span> -->
                    <ul class="uk-list">
                      <li><span class="uk-text-bold">Адрес: </span>{{ address.result }}</li>
                      <li><span class="uk-text-bold">Индекс: </span>{{ address.postal_code }}</li>
                      <li><span class="uk-text-bold">Округ: </span>{{ address.city_area }}</li>
                      <li class="uk-text-muted"><span>Широта: </span> {{ address.geo_lat }}</li>
                      <li class="uk-text-muted"><span>Долгота: </span> {{ address.geo_lon }}</li>
                      <li v-if="address.qc === 1 || address.qc === 3"><span class="uk-text-danger uk-text-bold">Требуется ручная проверка записи</span></li>
                      <li v-if="address.source"><span class="uk-text-muted">Ближайшие станции метро: </span>
                        <ul class="uk-list uk-text-muted">
                          <li>{{ address.metro[0].name }} ({{ address.metro[0].distance }} км.)</li>
                          <li>{{ address.metro[1].name }} ({{ address.metro[1].distance }} км.)</li>
                          <li>{{ address.metro[2].name }} ({{ address.metro[2].distance }} км.)</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
              </div>
          </div>
          <!-- HACK: Для тестирования -->
          <!-- <div class="uk-margin">
              <div class="uk-margin uk-text-left">
                <label v-if="result.fio">ФИО: </label>
                <span>{{ result.fio }}</span>
              </div>
              <div class="uk-margin uk-text-left">
                <label v-if="result.sourceAddr">Адрес: </label>
                <span>{{ result.sourceAddr }}</span>
              </div>
              <div class="uk-margin uk-text-left">
                <label v-if="result.sourcePhone">Телефон: </label>
                <span>{{ result.sourcePhone }}</span>
              </div>
              <div class="uk-margin uk-text-left" v-if="result.fio || result.sourceAddr || result.sourcePhone">
                <label v-if="result">JSON запрос: </label>
                <span>{{ result }}</span>
              </div>
          </div> -->
          </div>
        </div>
      </div>
</template>

<script>
import fetchData from '@/services/fetchData'
import vuesuggestions from 'vue-suggestions'
export default {
  data () {
    return {
      answer: null,
      people: [],
      address: [],
      phone: [],
      passport: [],
      result: {
        fio: null,
        sourceAddr: null,
        sourcePhone: null,
        sourcePassport: null
      },
      suggestionOptions: {
        token: '5a8384a27f0726feddd97ead2d6029cf9f79e03a',
        type: 'ADDRESS',
        scrollOnFocus: true,
        triggerSelectOnBlur: true,
        triggerSelectOnEnter: false,
        addon: 'none',
        onSelect (suggestion) {
        }
      }
    }
  },
  methods: {
    async checkDadata () {
      this.error = null
      try {
        console.log(this.result)
        this.answer = (await fetchData.post(this.result)).data
        this.people = this.answer.data[0][0]
        this.address = this.answer.data[0][1]
        this.phone = this.answer.data[0][2]
        this.passport = this.answer.data[0][3]
        console.log(this.people)
      } catch (error) {
        console.log(error)
      }
    }
  },
  components: { vuesuggestions }
}
</script>
