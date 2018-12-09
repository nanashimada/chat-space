FactoryGirl.define do

  factory :message do
    body Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/images/写真例.jpg")
    group
    user
  end

end