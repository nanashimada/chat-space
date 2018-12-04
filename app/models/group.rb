class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :members
  validates :name, presence: true


end
