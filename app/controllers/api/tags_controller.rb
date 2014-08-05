module Api
  class TagsController < ApiController

    def create
      @tag = Tag.new(tag_params)
      if @tag.save
        render json: @tag
      else
        render json: @tag.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @tag = Tag.find(params[:id])
      @tag.destroy
      render json: {}
    end

    def update
      @tag = Tag.find(params[:id])
      if @tag.update_attributes(tag_params)
        render json: @tag
      else
        render json: @tag.errors.full_messages, status: :unprocessable_entity
      end
    end


    def index
      @tags = Tag.all
      render json: @tags
    end

    def show
      @tag = Tag.includes(:users).find(params[:id])
      render :show
    end

    def tag_params
      params.require(:tag).permit(:name, :description)
    end
  end
end