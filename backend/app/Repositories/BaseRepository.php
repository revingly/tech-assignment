<?php

namespace App\Repositories;

use Exception;
use Illuminate\Database\Eloquent\Model;

abstract class BaseRepository
{
    protected string|null $model = null;
    private Model|null $modelInstance = null;

    /**
     * @throws Exception
     */
    public function __construct()
    {
        $this->makeModel();
    }

    /**
     * @throws Exception
     */
    public function makeModel(): Model
    {
        if (empty($this->model)) {
            throw new Exception('The model class must be set on the repository.');
        }

        return $this->modelInstance = new $this->model;
    }

    /**
     * Get a new entity instance
     *
     * @param array $attributes
     *
     * @return Model
     */
    public function getNew(array $attributes = []): Model
    {
        return $this->modelInstance->newInstance($attributes);
    }

    /**
     * @param array $attributes
     * @return Model
     * @throws Exception
     */
    public function create(array $attributes): Model
    {
        $entity = $this->getNew($attributes);

        if ($entity->save()) {
            return $entity;
        }

        throw new Exception("Failed to create entity");
    }
}
