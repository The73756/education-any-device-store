import { makeAutoObservable } from 'mobx'
import { SORT } from '@/utils/consts'

export class DeviceStore {
  constructor() {
    this._types = []
    this._brands = []
    this._devices = []
    this.selectedType = {}
    this.selectedBrand = {}
    this._page = 1
    this._totalCount = 0
    this._limit = 4
    this._search = ''
    this._sort = SORT.NAME
    this._order = 'ASC'
    makeAutoObservable(this)
  }

  resetFilters() {
    this.setSelectedType({})
    this.setSelectedBrand({})
    this.setSearch('')
  }

  setTypes(types) {
    this._types = types
  }

  setBrands(brands) {
    this._brands = brands
  }

  setDevices(devices) {
    this._devices = devices
  }

  setSelectedType(type) {
    this.setPage(1)
    this.selectedType = type
  }

  setSelectedBrand(brand) {
    this.setPage(1)
    this.selectedBrand = brand
  }

  setPage(page) {
    this._page = page
  }

  setTotalCount(totalCount) {
    this._totalCount = totalCount
  }

  setLimit(limit) {
    this._limit = limit
  }

  setSearch(search) {
    this.setPage(1)
    this._search = search
  }

  setSort(sort) {
    this.setPage(1)
    this._sort = sort
  }

  setOrder(order) {
    this.setPage(1)
    this._order = order
  }

  get types() {
    return this._types
  }

  get brands() {
    return this._brands
  }

  get devices() {
    return this._devices
  }

  get SelectedType() {
    return this._selectedType
  }

  get SelectedBrand() {
    return this._selectedBrand
  }

  get page() {
    return this._page
  }

  get totalCount() {
    return this._totalCount
  }

  get limit() {
    return this._limit
  }

  get search() {
    return this._search
  }

  get sort() {
    return this._sort
  }

  get order() {
    return this._order
  }
}
